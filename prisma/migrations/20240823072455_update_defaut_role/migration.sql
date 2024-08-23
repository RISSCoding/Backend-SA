/*
  Warnings:

  - You are about to drop the column `address` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `account` table. All the data in the column will be lost.
  - Added the required column `email` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `account` DROP COLUMN `address`,
    DROP COLUMN `phoneNumber`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL;
