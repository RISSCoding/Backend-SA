-- AlterTable
ALTER TABLE `account` ADD COLUMN `isApproved` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `presence` ADD COLUMN `checkInPhoto` VARCHAR(191) NULL,
    ADD COLUMN `checkOutPhoto` VARCHAR(191) NULL;
