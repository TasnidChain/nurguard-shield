CREATE TABLE `user_preferences` (
	`id` varchar(26) NOT NULL,
	`userId` int NOT NULL,
	`cooldownSeconds` int NOT NULL DEFAULT 7,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_preferences_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_preferences_userId_unique` UNIQUE(`userId`)
);
