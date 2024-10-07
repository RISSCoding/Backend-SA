/*
  Warnings:

  - You are about to drop the column `scheduleID` on the `presence` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Presence_scheduleID_fkey` ON `presence`;

-- AlterTable
ALTER TABLE `presence` DROP COLUMN `scheduleID`;
