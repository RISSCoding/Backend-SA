/*
  Warnings:

  - You are about to alter the column `role` on the `account` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to alter the column `type` on the `notification` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to alter the column `status` on the `presence` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `account` MODIFY `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE `notification` MODIFY `type` ENUM('LEAVE_APPROVAL', 'PRESENCE_DELAY') NOT NULL;

-- AlterTable
ALTER TABLE `presence` MODIFY `status` ENUM('PRESENT', 'ABSENT', 'LATE') NOT NULL DEFAULT 'PRESENT';
