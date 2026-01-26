CREATE TABLE `app_cooldown_overrides` (
	`id` varchar(26) NOT NULL,
	`userId` int NOT NULL,
	`packageName` varchar(128) NOT NULL,
	`appName` varchar(128) NOT NULL,
	`cooldownSeconds` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `app_cooldown_overrides_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `daily_bypasses` (
	`id` varchar(26) NOT NULL,
	`userId` int NOT NULL,
	`date` varchar(10) NOT NULL,
	`bypassCount` int NOT NULL DEFAULT 0,
	`bypassLimit` int NOT NULL DEFAULT 3,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `daily_bypasses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `panic_mode_sessions` (
	`id` varchar(26) NOT NULL,
	`userId` int NOT NULL,
	`deviceId` varchar(26),
	`startedAt` timestamp NOT NULL DEFAULT (now()),
	`endsAt` timestamp NOT NULL,
	`isActive` boolean NOT NULL DEFAULT true,
	`reason` varchar(255),
	CONSTRAINT `panic_mode_sessions_id` PRIMARY KEY(`id`)
);
