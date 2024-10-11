/*
  Warnings:

  - You are about to alter the column `role` on the `account` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `VarChar(191)`.
  - You are about to drop the column `userID` on the `presence` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `presence` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `VarChar(191)`.
  - Added the required column `updatedAt` to the `Presence` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Presence` table without a default value. This is not possible if the table is not empty.
  - Made the column `checkInTime` on table `presence` required. This step will fail if there are existing NULL values in that column.
  - Made the column `checkInLocation` on table `presence` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `presence` DROP FOREIGN KEY `Presence_userID_fkey`;

-- AlterTable
ALTER TABLE `account` ADD COLUMN `division` VARCHAR(191) NULL,
    ADD COLUMN `facePhoto` VARCHAR(191) NULL,
    ADD COLUMN `isApproved` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `position` VARCHAR(191) NULL,
    MODIFY `role` VARCHAR(191) NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE `presence` DROP COLUMN `userID`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `checkInTime` DATETIME(3) NOT NULL,
    MODIFY `checkInLocation` VARCHAR(191) NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Presence` ADD CONSTRAINT `Presence_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Account`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;
