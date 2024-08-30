-- CreateTable
CREATE TABLE `Presence` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `checkInTime` DATETIME(3) NULL,
    `checkOutTime` DATETIME(3) NULL,
    `checkInPhoto` VARCHAR(191) NULL,
    `checkOutPhoto` VARCHAR(191) NULL,
    `checkInLocation` VARCHAR(191) NULL,
    `checkOutLocation` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'Present',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
