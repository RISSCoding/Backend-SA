/*
  Warnings:

  - Added the required column `position` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `account` ADD COLUMN `position` VARCHAR(191) NOT NULL;
