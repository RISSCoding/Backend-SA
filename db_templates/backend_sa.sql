-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 30, 2024 at 02:37 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `backend_sa`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `userID` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `position` varchar(191) DEFAULT NULL,
  `facePhoto` varchar(191) DEFAULT NULL,
  `role` varchar(191) NOT NULL DEFAULT 'USER',
  `isApproved` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`userID`, `name`, `email`, `password`, `phone`, `position`, `facePhoto`, `role`, `isApproved`, `createdAt`, `updatedAt`) VALUES
(1, 'rafif', 'rafif@gmail.com', '$2b$10$6V6I0RbdVFAvIHf7Gr5uUe1USRBVMvzbsh/bTEf5etgeITLl5jlVK', '', NULL, NULL, 'USER', 1, '2024-09-21 09:06:21.802', '2024-09-21 09:09:05.348'),
(2, 'faris', 'faris@gmail.com', '$2b$10$ftUK6CtxD.ie1xZUcPX/l.MtBhax1TcYbru60MPjuyAf703qISuMy', '', NULL, NULL, 'USER', 0, '2024-09-21 09:43:39.787', '2024-09-21 09:43:39.787'),
(3, 'jaki', 'jaki@gmail.com', '$2b$10$RrrOB.c5CT4NldTQYyyr4.36x5rPbkXEEVzz3RGGMLOmoTVUwq0HW', '', NULL, NULL, 'USER', 0, '2024-09-21 09:44:45.636', '2024-09-21 09:44:45.636'),
(4, 'yur', 'yur@gmail.com', '$2b$10$PmFYOqUe20lJeW5k3psY5ONyvRqhV63au9dU78h1SAF87iYQlc1Ki', '', NULL, NULL, 'USER', 1, '2024-09-21 09:53:27.136', '2024-09-21 09:55:14.702');

-- --------------------------------------------------------

--
-- Table structure for table `leaverequest`
--

CREATE TABLE `leaverequest` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `type` enum('PERMISSION','SICK','HOLIDAY','OFFICEDUTY','WFH') NOT NULL,
  `startDate` datetime(3) NOT NULL,
  `endDate` datetime(3) NOT NULL,
  `reason` varchar(191) NOT NULL,
  `status` enum('PENDING','APPROVED','REJECTED') NOT NULL DEFAULT 'PENDING',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `presence`
--

CREATE TABLE `presence` (
  `id` int(11) NOT NULL,
  `checkInTime` datetime(3) DEFAULT NULL,
  `checkOutTime` datetime(3) DEFAULT NULL,
  `checkInPhoto` varchar(191) DEFAULT NULL,
  `checkOutPhoto` varchar(191) DEFAULT NULL,
  `checkInLocation` varchar(191) DEFAULT NULL,
  `checkOutLocation` varchar(191) DEFAULT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'Present',
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `userID` int(11) NOT NULL,
  `scheduleID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `date` datetime(3) NOT NULL,
  `startTime` datetime(3) NOT NULL,
  `endTime` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('dec063b8-4505-4ee7-b5dc-2a7ded6b8a90', '6f90dd2cb31f6439564e061ab08433d5dcdd60a9d25e28b6fe64778c4675fdd1', '2024-09-21 09:05:22.464', '20240921090522_', NULL, NULL, '2024-09-21 09:05:22.334', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `Account_email_key` (`email`);

--
-- Indexes for table `leaverequest`
--
ALTER TABLE `leaverequest`
  ADD PRIMARY KEY (`id`),
  ADD KEY `LeaveRequest_userId_fkey` (`userId`);

--
-- Indexes for table `presence`
--
ALTER TABLE `presence`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Presence_userID_fkey` (`userID`),
  ADD KEY `Presence_scheduleID_fkey` (`scheduleID`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `leaverequest`
--
ALTER TABLE `leaverequest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `presence`
--
ALTER TABLE `presence`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `leaverequest`
--
ALTER TABLE `leaverequest`
  ADD CONSTRAINT `LeaveRequest_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `account` (`userID`) ON UPDATE CASCADE;

--
-- Constraints for table `presence`
--
ALTER TABLE `presence`
  ADD CONSTRAINT `Presence_scheduleID_fkey` FOREIGN KEY (`scheduleID`) REFERENCES `schedule` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Presence_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `account` (`userID`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;