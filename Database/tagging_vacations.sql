-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: אוקטובר 22, 2019 בזמן 01:48 PM
-- גרסת שרת: 10.4.6-MariaDB
-- PHP Version: 7.1.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tagging_vacations`
--
CREATE DATABASE IF NOT EXISTS `tagging_vacations` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `tagging_vacations`;

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `admin`
--

CREATE TABLE `admin` (
  `userID` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- הוצאת מידע עבור טבלה `admin`
--

INSERT INTO `admin` (`userID`, `firstName`, `lastName`, `username`, `password`) VALUES
(1, '', '', 'davidk', 'dk123456');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `followers`
--

CREATE TABLE `followers` (
  `ID` int(11) NOT NULL,
  `vacationID` int(11) NOT NULL,
  `userID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- הוצאת מידע עבור טבלה `followers`
--

INSERT INTO `followers` (`ID`, `vacationID`, `userID`) VALUES
(28, 33, 10),
(30, 37, 10),
(33, 39, 11),
(34, 36, 11),
(35, 33, 12),
(36, 33, 13),
(37, 36, 13),
(38, 34, 13),
(39, 33, 14),
(40, 35, 14),
(41, 39, 14),
(42, 39, 10),
(45, 35, 10),
(47, 34, 10),
(51, 33, 11);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- הוצאת מידע עבור טבלה `users`
--

INSERT INTO `users` (`userID`, `firstName`, `lastName`, `username`, `password`) VALUES
(10, 'Moshe', 'Ofnik', 'user1', '123456'),
(11, 'Eli', 'Cohen', 'user2', '123456'),
(12, 'Yosef', 'Levi', 'user3', '123456'),
(13, 'Menachem', 'Dan', 'user4', '123456'),
(14, 'Beny', 'Fridman', 'user5', '123456');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `vacations`
--

CREATE TABLE `vacations` (
  `vacationID` int(11) NOT NULL,
  `description` varchar(254) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `imageName` varchar(500) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- הוצאת מידע עבור טבלה `vacations`
--

INSERT INTO `vacations` (`vacationID`, `description`, `destination`, `imageName`, `startDate`, `endDate`, `price`) VALUES
(33, 'Couple vacation The hotel has everything included', 'Paris', 'df583cc2b7dbed6e0b371af743ac457e.jfif', '2019-10-22', '2019-10-27', 800),
(34, 'A dream vacation in Greece is an all inclusive hotel', 'Greece', '9c80d2bcea9944e0c5b752ae3379cbe1.jfif', '2019-11-06', '2019-11-09', 450),
(35, 'Vacation in the Big Apple A trip to Manhattan is included', 'New York', 'd305b24d314d72359595feebdcbf37dc.jfif', '2019-10-21', '2019-10-31', 1500),
(36, 'Organized trip London trip Big Ben', 'London', '09a0fb286ac66bd7d6bde8cf50ec15be.jfif', '2019-12-12', '2019-12-25', 600),
(37, 'Thailand vacation includes mountain trek', 'Thailand', '55819fac0aeb0953cad299708ce641f1.jpg', '2019-10-28', '2019-10-30', 650),
(38, 'Deal to Georgia includes a trip to Batumi', 'Georgia', '278224cdc12f63f8fb7c16c084a9897b.jfif', '2019-11-11', '2019-11-25', 450),
(39, 'Trip to Moscow Special trip to Red Square', 'Moscow', 'd9b9710c5dd8cd16f11330aa06ebfa95.jfif', '2019-10-15', '2019-10-27', 850);

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`userID`);

--
-- אינדקסים לטבלה `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `vacationID` (`vacationID`),
  ADD KEY `UserID` (`userID`);

--
-- אינדקסים לטבלה `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- אינדקסים לטבלה `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `followers`
--
ALTER TABLE `followers`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- הגבלות לטבלאות שהוצאו
--

--
-- הגבלות לטבלה `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationID`) REFERENCES `vacations` (`vacationID`),
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
