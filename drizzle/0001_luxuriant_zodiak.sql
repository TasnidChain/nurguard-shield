CREATE TABLE `affiliate_referrals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`referrerId` int NOT NULL,
	`referredId` int NOT NULL,
	`referralCode` varchar(32) NOT NULL,
	`status` enum('pending','converted','expired') NOT NULL DEFAULT 'pending',
	`convertedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `affiliate_referrals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `blocking_rules` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`ruleType` enum('website','app','keyword','category') NOT NULL,
	`value` varchar(512) NOT NULL,
	`isActive` boolean NOT NULL DEFAULT true,
	`dailyLimitMinutes` int,
	`schedule` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blocking_rules_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `foundation_donations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`transactionId` int NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`foundationName` varchar(128) NOT NULL DEFAULT 'Masajid Builder Foundation',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `foundation_donations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gift_codes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(32) NOT NULL,
	`purchaserId` int NOT NULL,
	`redeemedById` int,
	`durationMonths` int NOT NULL DEFAULT 1,
	`status` enum('available','redeemed','expired') NOT NULL DEFAULT 'available',
	`purchasedAt` timestamp NOT NULL DEFAULT (now()),
	`redeemedAt` timestamp,
	`expiresAt` timestamp,
	CONSTRAINT `gift_codes_id` PRIMARY KEY(`id`),
	CONSTRAINT `gift_codes_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `streaks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`currentStreak` int NOT NULL DEFAULT 0,
	`longestStreak` int NOT NULL DEFAULT 0,
	`lastActiveDate` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `streaks_id` PRIMARY KEY(`id`),
	CONSTRAINT `streaks_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('subscription','affiliate_commission','foundation_donation','gift_purchase','gift_redemption','payout') NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`description` text,
	`lemonSqueezyOrderId` varchar(128),
	`relatedUserId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `transactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `usage_analytics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`date` timestamp NOT NULL,
	`totalScreenTime` int DEFAULT 0,
	`blockedAttempts` int DEFAULT 0,
	`complianceScore` int DEFAULT 100,
	`rulesViolated` int DEFAULT 0,
	`categoryBreakdown` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `usage_analytics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `subscriptionStatus` enum('free','active','cancelled','expired') DEFAULT 'free' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `subscriptionId` varchar(128);--> statement-breakpoint
ALTER TABLE `users` ADD `lemonSqueezyCustomerId` varchar(128);--> statement-breakpoint
ALTER TABLE `users` ADD `subscriptionEndsAt` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `affiliateCode` varchar(32);--> statement-breakpoint
ALTER TABLE `users` ADD `referredBy` varchar(32);--> statement-breakpoint
ALTER TABLE `users` ADD `affiliateEarnings` decimal(10,2) DEFAULT '0.00';--> statement-breakpoint
ALTER TABLE `users` ADD `availableBalance` decimal(10,2) DEFAULT '0.00';--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_affiliateCode_unique` UNIQUE(`affiliateCode`);