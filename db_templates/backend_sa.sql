-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 26, 2024 at 09:53 AM
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
  `password` varchar(191) NOT NULL,
  `role` enum('USER','ADMIN') NOT NULL DEFAULT 'USER',
  `email` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `phone` varchar(191) NOT NULL,
  `position` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`userID`, `password`, `role`, `email`, `name`, `phone`, `position`, `createdAt`, `updatedAt`) VALUES
(1, '$2b$10$zh8fqGWCDpTJhdMA6IT7j.PmwpKORKSLC3dgPnEq45dZzm9rtVA.S', 'USER', 'rafifpm@gmail.com', 'M Rafif', '08123456789', 'Project Manager', '2024-08-26 07:30:44.276', '2024-08-26 07:30:44.276'),
(2, '$2b$10$WKkn7Aokft33VJrDLnr4WOJMZCowPI8npstrv/5oBHB5CteiLXlLe', 'ADMIN', 'farisbe@gmail.com', 'M Faris', '08123456788', 'Backend Developer', '2024-08-26 07:31:42.804', '2024-08-26 07:31:42.804');

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

--
-- Dumping data for table `schedule`
--

INSERT INTO `schedule` (`id`, `date`, `startTime`, `endTime`, `createdAt`, `updatedAt`) VALUES
(1, '2024-08-27 00:00:00.000', '2024-08-27 09:00:00.000', '2024-08-27 17:00:00.000', '2024-08-26 07:48:41.234', '2024-08-26 07:48:41.234');

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
('5e6fc306-0f16-4485-9125-057f980ce0b9', '51dc0a95d9f7ea1c9cfa52d049d36097dcb8229486ae64ed2a33e3f59af83999', '2024-08-23 04:23:13.830', '20240823012259_created_account_data', NULL, NULL, '2024-08-23 04:23:13.121', 1),
('7729d818-baa2-413f-8bbb-3c401688511c', 'a28219254bbfffe55ea62b132f224cc2834571181e2e9d4f7682cf663f49c7f1', '2024-08-23 04:23:14.180', '20240823013838_added_role_to_account', NULL, NULL, '2024-08-23 04:23:13.888', 1),
('9b59450f-1e20-4871-b5f1-c95d7496650b', '556c8c047872f238f500bda22f03ea1671e10a8ec5d50d2b25981a052efcf490', '2024-08-23 07:26:35.934', '20240823072635_add_position_field', NULL, NULL, '2024-08-23 07:26:35.603', 1),
('9dee7607-acc2-4c4b-8bab-fb61f750231c', '487b7341e4f2ce72fc5aa6e0ef2e9769e90db20c5d53f64f43a63a1cce9898dd', '2024-08-26 07:13:23.134', '20240826071322_add_schedule_model', NULL, NULL, '2024-08-26 07:13:22.711', 1),
('a12749a9-9e17-42ce-a6b8-93b1bade1c7d', '7cb14004d3b7beba6fdaf64f6df64faf2c12d2277584b9b9e1809e4a55159d3a', '2024-08-26 07:23:22.179', '20240826072321_update_account_data', NULL, NULL, '2024-08-26 07:23:21.742', 1),
('c30d9b9f-0a7a-47e0-8d27-b4676a2d811b', 'a555f708946a89d7b1f26914530733d1f615b324307190acb2d07ac7235ebab6', '2024-08-23 07:24:55.651', '20240823072455_update_defaut_role', NULL, NULL, '2024-08-23 07:24:55.262', 1),
('c7b2a9dc-95e9-4acc-8c2d-97dd05625c9c', 'f30a14570d684f2288c879decfacbd2997c6c17bfdff94bccd9becc5b6b7245d', '2024-08-26 07:39:27.155', '20240826073926_make_email_unique', NULL, NULL, '2024-08-26 07:39:26.549', 1);

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
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
