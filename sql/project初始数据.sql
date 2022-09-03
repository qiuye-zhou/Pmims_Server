-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2022-08-11 09:00:22
-- 服务器版本： 10.1.32-MariaDB
-- PHP Version: 5.6.36

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project`
--

-- --------------------------------------------------------

--
-- 表的结构 `account`
--

CREATE TABLE `account` (
  `id` int(12) NOT NULL,
  `number` varchar(12) COLLATE utf8_bin NOT NULL,
  `password` varchar(12) COLLATE utf8_bin NOT NULL,
  `grade` int(2) NOT NULL DEFAULT '3'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `account`
--

INSERT INTO `account` (`id`, `number`, `password`, `grade`) VALUES
(1, 'supadmin', 'supadmin', 1),
(2, 'admin001', 'admin001', 2),
(3, 'user001', 'user001', 3);

-- --------------------------------------------------------

--
-- 表的结构 `activity`
--

CREATE TABLE `activity` (
  `activ_id` int(12) NOT NULL,
  `activ_name` varchar(20) COLLATE utf8_bin NOT NULL,
  `activ_time` date NOT NULL,
  `activ_integral` int(12) NOT NULL,
  `activ_result` tinyint(1) NOT NULL DEFAULT '0',
  `activ_describe` text COLLATE utf8_bin NOT NULL,
  `form` text COLLATE utf8_bin NOT NULL,
  `file` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `awards`
--

CREATE TABLE `awards` (
  `id` int(12) NOT NULL,
  `aw_name` varchar(20) COLLATE utf8_bin NOT NULL,
  `aw_prize` varchar(20) COLLATE utf8_bin NOT NULL,
  `aw_time` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `details`
--

CREATE TABLE `details` (
  `id` int(12) NOT NULL,
  `activ_id` int(12) NOT NULL,
  `deta_evaluation` tinytext COLLATE utf8_bin NOT NULL,
  `deta_win` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `examine`
--

CREATE TABLE `examine` (
  `id` int(12) NOT NULL,
  `ex_name` varchar(36) COLLATE utf8_bin NOT NULL,
  `ex_li` varchar(36) COLLATE utf8_bin NOT NULL,
  `ex_time` date NOT NULL,
  `ex_result` varchar(12) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `personal`
--

CREATE TABLE `personal` (
  `id` int(12) NOT NULL,
  `name` varchar(20) COLLATE utf8_bin NOT NULL,
  `sex` varchar(12) COLLATE utf8_bin DEFAULT NULL,
  `integral` int(12) NOT NULL DEFAULT '0',
  `department` varchar(12) COLLATE utf8_bin NOT NULL,
  `jointime` date NOT NULL,
  `age` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `personal`
--

INSERT INTO `personal` (`id`, `name`, `sex`, `integral`, `department`, `jointime`) VALUES
(1, '高级管理员', '男', 0, '管理员', '2022-08-01', '2001-02-02'),
(2, '管理员', '女', 0, '管理员', '2022-08-02', '2002-02-02'),
(3, '用户001', '男', 0, '部门1', '2022-08-03', '2005-02-02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `number` (`number`);

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`activ_id`),
  ADD UNIQUE KEY `activ_id` (`activ_id`);

--
-- Indexes for table `awards`
--
ALTER TABLE `awards`
  ADD KEY `id` (`id`);

--
-- Indexes for table `details`
--
ALTER TABLE `details`
  ADD KEY `id` (`id`),
  ADD KEY `activ_id` (`activ_id`);

--
-- Indexes for table `examine`
--
ALTER TABLE `examine`
  ADD KEY `id` (`id`);

--
-- Indexes for table `personal`
--
ALTER TABLE `personal`
  ADD KEY `id` (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `account`
--
ALTER TABLE `account`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- 使用表AUTO_INCREMENT `activity`
--
ALTER TABLE `activity`
  MODIFY `activ_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- 限制导出的表
--

--
-- 限制表 `awards`
--
ALTER TABLE `awards`
  ADD CONSTRAINT `awards_ibfk_1` FOREIGN KEY (`id`) REFERENCES `account` (`id`);

--
-- 限制表 `details`
--
ALTER TABLE `details`
  ADD CONSTRAINT `details_ibfk_1` FOREIGN KEY (`id`) REFERENCES `account` (`id`),
  ADD CONSTRAINT `details_ibfk_2` FOREIGN KEY (`activ_id`) REFERENCES `activity` (`activ_id`);

--
-- 限制表 `examine`
--
ALTER TABLE `examine`
  ADD CONSTRAINT `id` FOREIGN KEY (`id`) REFERENCES `account` (`id`);

--
-- 限制表 `personal`
--
ALTER TABLE `personal`
  ADD CONSTRAINT `personal_ibfk_1` FOREIGN KEY (`id`) REFERENCES `account` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
