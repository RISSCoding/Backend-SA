/*
  Warnings:

  - You are about to drop the column `checkInPhoto` on the `presence` table. All the data in the column will be lost.
  - You are about to drop the column `checkOutPhoto` on the `presence` table. All the data in the column will be lost.
  - Added the required column `scheduleID` to the `Presence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `presence` DROP COLUMN `checkInPhoto`,
    DROP COLUMN `checkOutPhoto`,
    ADD COLUMN `scheduleID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Presence` ADD CONSTRAINT `Presence_scheduleID_fkey` FOREIGN KEY (`scheduleID`) REFERENCES `Schedule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
