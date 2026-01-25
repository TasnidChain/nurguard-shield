CREATE TABLE `daily_reports` (
	`id` varchar(26) NOT NULL,
	`userId` int NOT NULL,
	`deviceId` varchar(26),
	`date` timestamp NOT NULL,
	`blockedAttemptsTotal` int NOT NULL DEFAULT 0,
	`overridesTotal` int NOT NULL DEFAULT 0,
	`timeSavedSeconds` int NOT NULL DEFAULT 0,
	`categoryUsedJson` json,
	`triggeredHoursJson` json,
	`topAppsJson` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `daily_reports_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `device_overrides` (
	`id` varchar(26) NOT NULL,
	`deviceId` varchar(26) NOT NULL,
	`overridesJson` json NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `device_overrides_id` PRIMARY KEY(`id`),
	CONSTRAINT `device_overrides_deviceId_unique` UNIQUE(`deviceId`)
);
--> statement-breakpoint
CREATE TABLE `devices` (
	`id` varchar(26) NOT NULL,
	`userId` int NOT NULL,
	`platform` enum('android','ios') NOT NULL,
	`deviceFingerprint` varchar(128) NOT NULL,
	`pushToken` varchar(255),
	`appVersion` varchar(32) NOT NULL,
	`osVersion` varchar(32) NOT NULL,
	`model` varchar(64) NOT NULL,
	`locale` varchar(16) NOT NULL,
	`timezone` varchar(64) NOT NULL,
	`lastSeenAt` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `devices_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `entitlements` (
	`id` varchar(26) NOT NULL,
	`userId` int NOT NULL,
	`status` enum('active','past_due','canceled','trial') NOT NULL,
	`plan` varchar(32) NOT NULL DEFAULT 'nurguard_yearly',
	`currentPeriodEnd` timestamp NOT NULL,
	`source` varchar(32),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `entitlements_id` PRIMARY KEY(`id`),
	CONSTRAINT `entitlements_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `ruleset_items` (
	`id` varchar(26) NOT NULL,
	`rulesetId` varchar(26) NOT NULL,
	`type` enum('app','domain','category') NOT NULL,
	`action` enum('block','allow') NOT NULL,
	`key` varchar(255) NOT NULL,
	`metaJson` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `ruleset_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `rulesets` (
	`id` varchar(26) NOT NULL,
	`platform` enum('android','ios','all') NOT NULL,
	`version` int NOT NULL,
	`isActive` boolean NOT NULL DEFAULT true,
	`notes` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `rulesets_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sacred_hours` (
	`id` varchar(26) NOT NULL,
	`userId` int NOT NULL,
	`label` varchar(32) NOT NULL,
	`daysMask` int NOT NULL,
	`startMinute` int NOT NULL,
	`endMinute` int NOT NULL,
	`timezone` varchar(64) NOT NULL,
	`isEnabled` boolean NOT NULL DEFAULT true,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sacred_hours_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `time_budgets` (
	`id` varchar(26) NOT NULL,
	`userId` int NOT NULL,
	`category` enum('social','entertainment','learning','deen') NOT NULL,
	`dailyLimitSeconds` int NOT NULL,
	`isEnabled` boolean NOT NULL DEFAULT true,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `time_budgets_id` PRIMARY KEY(`id`)
);
