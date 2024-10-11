/*
  Warnings:

  - You are about to drop the column `division` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `facePhoto` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `isApproved` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `checkInPhoto` on the `presence` table. All the data in the column will be lost.
  - You are about to drop the column `checkOutPhoto` on the `presence` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `presence` table. All the data in the column will be lost.
  - You are about to drop the column `scheduleID` on the `presence` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `presence` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `schedule` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `schedule` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `schedule` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `presence` DROP FOREIGN KEY `Presence_scheduleID_fkey`;

-- AlterTable
ALTER TABLE `account` DROP COLUMN `division`,
    DROP COLUMN `facePhoto`,
    DROP COLUMN `isApproved`,
    DROP COLUMN `position`;

-- AlterTable
ALTER TABLE `presence` DROP COLUMN `checkInPhoto`,
    DROP COLUMN `checkOutPhoto`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `scheduleID`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `schedule` DROP COLUMN `createdAt`,
    DROP COLUMN `isActive`,
    DROP COLUMN `updatedAt`;
