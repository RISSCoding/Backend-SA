/*
  Warnings:

  - You are about to alter the column `status` on the `presence` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to drop the column `createdAt` on the `schedule` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `schedule` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `presence` DROP FOREIGN KEY `Presence_scheduleID_fkey`;

-- AlterTable
ALTER TABLE `presence` MODIFY `status` ENUM('PRESENT', 'ABSENT', 'LATE') NOT NULL DEFAULT 'PRESENT';

-- AlterTable
ALTER TABLE `schedule` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- CreateTable
CREATE TABLE `Notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `isRead` BOOLEAN NOT NULL DEFAULT false,
    `type` ENUM('LEAVE_APPROVAL', 'PRESENCE_DELAY') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Account`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;
