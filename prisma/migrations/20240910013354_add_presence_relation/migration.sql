/*
  Warnings:

  - Added the required column `userID` to the `Presence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `presence` ADD COLUMN `userID` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Presence` ADD CONSTRAINT `Presence_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `Account`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;
