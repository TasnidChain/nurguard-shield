import NetworkExtension
import os.log

class PacketTunnelProvider: NEPacketTunnelProvider {
    private var blockedDomains: Set<String> = []
    
    override func startTunnel(options: [String : NSObject]?, completionHandler: @escaping (Error?) -> Void) {
        // Load blocked domains from backend
        Task {
            await loadBlockedDomains()
        }
        
        // Configure tunnel settings
        let settings = NEPacketTunnelNetworkSettings(tunnelRemoteAddress: "10.0.0.1")
        
        // DNS settings - route through our filter
        let dnsSettings = NEDNSSettings(servers: ["1.1.1.1", "1.0.0.1"])
        dnsSettings.matchDomains = [""]
        settings.dnsSettings = dnsSettings
        
        // IPv4 settings
        let ipv4Settings = NEIPv4Settings(addresses: ["10.0.0.2"], subnetMasks: ["255.255.255.0"])
        ipv4Settings.includedRoutes = [NEIPv4Route.default()]
        settings.ipv4Settings = ipv4Settings
        
        setTunnelNetworkSettings(settings) { error in
            if let error = error {
                os_log("Failed to set tunnel settings: %{public}@", log: .default, type: .error, error.localizedDescription)
                completionHandler(error)
                return
            }
            
            os_log("Tunnel started successfully", log: .default, type: .info)
            completionHandler(nil)
        }
    }
    
    override func stopTunnel(with reason: NEProviderStopReason, completionHandler: @escaping () -> Void) {
        os_log("Tunnel stopped: %{public}@", log: .default, type: .info, String(describing: reason))
        completionHandler()
    }
    
    override func handleAppMessage(_ messageData: Data, completionHandler: ((Data?) -> Void)?) {
        // Handle messages from main app (e.g., update blocked domains)
        if let message = try? JSONDecoder().decode(VPNMessage.self, from: messageData) {
            switch message.type {
            case "updateBlocklist":
                if let domains = message.domains {
                    self.blockedDomains = Set(domains)
                }
            default:
                break
            }
        }
        completionHandler?(nil)
    }
    
    private func loadBlockedDomains() async {
        // Fetch blocked domains from backend API
        guard let url = URL(string: "https://nurguard.manus.space/api/trpc/mobile.getBlockedDomains") else {
            return
        }
        
        do {
            let (data, _) = try await URLSession.shared.data(from: url)
            let response = try JSONDecoder().decode(BlockedDomainsResponse.self, from: data)
            self.blockedDomains = Set(response.domains)
            os_log("Loaded %d blocked domains", log: .default, type: .info, blockedDomains.count)
        } catch {
            os_log("Failed to load blocked domains: %{public}@", log: .default, type: .error, error.localizedDescription)
        }
    }
    
    private func shouldBlockDomain(_ domain: String) -> Bool {
        // Check if domain matches any blocked domain
        for blockedDomain in blockedDomains {
            if domain.hasSuffix(blockedDomain) || domain == blockedDomain {
                return true
            }
        }
        return false
    }
}

struct VPNMessage: Codable {
    let type: String
    let domains: [String]?
}

struct BlockedDomainsResponse: Codable {
    let domains: [String]
}
