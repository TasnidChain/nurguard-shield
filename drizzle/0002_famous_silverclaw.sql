CREATE TABLE `violations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`ruleId` int NOT NULL,
	`violationType` varchar(64) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `violations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `hasCompletedOnboarding` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `protectionIntent` text;--> statement-breakpoint
ALTER TABLE `users` ADD `streakDays` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `streakStartedAt` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `complianceScore` int DEFAULT 100 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `lastViolationAt` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `totalBlockedAttempts` int DEFAULT 0 NOT NULL;