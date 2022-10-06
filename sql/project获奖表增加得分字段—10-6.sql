-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2022-10-06 10:12:12
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
(1, 'admin159', 'admin357', 1),
(2, 'user001', 'user001', 3),
(3, 'user002', 'user002', 3),
(11, 'user004', 'user004', 3),
(12, 'admin222', 'admin222', 2),
(13, 'supadmin', 'supadmin', 1),
(14, 'user555', 'user555', 3),
(15, 'user006', 'user006', 3);

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

--
-- 转存表中的数据 `activity`
--

INSERT INTO `activity` (`activ_id`, `activ_name`, `activ_time`, `activ_integral`, `activ_result`, `activ_describe`, `form`, `file`) VALUES
(1, '第一场运动会', '2022-07-05', 2, 1, '第一次的学校运动会，其他信息，其他学校', '11月1日-11月5日，二级学院党总支开展集体学习和信访举报现场宣传活动，非二级学院党组织开展集体学习和宣传活动。纪委机关将对各党总支、直属党支部集体学习情况和信访举报宣传活动进行督导检查。', 0),
(2, '第二场运动会', '2022-07-07', 3, 1, '第二次运动会，其他信息，其他的东西，等等等等', '以习近平新时代中国特色社会主义思想和十九大精神为指导，认真贯彻落实习近平总书记关于全面从严治党的重要论述、习近平总书记“七一”重要讲话和习近平总书记在党史学习教育动员大会上的重要讲话精神，紧密结合高校党委在落实全面从严治党主体责任、纪委履行监督责任中面临的新情况和新问题，深刻总结高校在党风廉政建设中取得的经验，大力探索新时代廉洁校园文化建设的新思路、新举措、新对策，为推进党风廉政建设理论创新和实践创新，推进全面从严治党在高校落地生根，推进高校风清气正的政治生态建设，提供理论支撑和智力支持。', 0),
(5, '第三次运动会', '2022-08-18', 1, 0, '第三次运动会活动简介', '活动详细信息', 0),
(6, '第四场运动会', '2022-07-09', 2, 1, '第四场运动会第四场运动会第四场运动会', '第四场运动会第四场运动会第四场运动会第四场运动会第四场运动会', 0),
(7, '第五场运动会', '2022-07-20', 2, 1, '第五场运动会第五场运动会第五场运动会第五场运动会第五场运动会第五场运动会', '第五场运动会第五场运动会第五场运动会第五场运动会第五场运动会第五场运动会第五场运动会', 0),
(8, '发布测试', '2022-08-17', 1, 1, '<h2>测试测试<h2/>', '<h2>测试测试<h2/><h2>测试测试<h2/><h2>测试测试<h2/>', 0),
(9, '发布测试2', '2022-08-23', 2, 0, '<h2>h22<h2/>\n<p>cscscscscscsc<p/>\n<h2>h22<h2/>\n<p>cscscscscscscs<p/>', '<h2>h22<h2/>\n<p>cscscscscscsc<p/>\n<h2>h22<h2/>\n<p>cscscscscscscs<p/>', 0),
(10, '测试提交文件区别', '2022-08-30', 3, 0, '<h5>测试提交文件区别<h5/><h5>测试提交文件区别<h5/>', '<h5>测试提交文件区别<h5/><h5>测试提交文件区别<h5/>', 0),
(12, '测试提交文件区别1', '2022-08-30', 1, 0, '<h5>测试提交文件区别<h5/>', '<h5>测试提交文件区别<h5/><h5>测试提交文件区别<h5/>', 0),
(13, '测试提交文件区别2', '2022-09-29', 2, 0, '<h5>测试提交文件区别<h5/><h5>测试提交文件区别<h5/>', '<h5>测试提交文件区别<h5/><h5>测试提交文件区别<h5/>', 1),
(14, '文件上传测试222', '2022-09-29', 1, 0, '文件上传测试222', '文件上传测试222', 1);

-- --------------------------------------------------------

--
-- 表的结构 `awards`
--

CREATE TABLE `awards` (
  `id` int(12) NOT NULL,
  `aw_name` varchar(20) COLLATE utf8_bin NOT NULL,
  `aw_prize` varchar(20) COLLATE utf8_bin NOT NULL,
  `aw_time` date NOT NULL,
  `aw_addinte` int(200) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `awards`
--

INSERT INTO `awards` (`id`, `aw_name`, `aw_prize`, `aw_time`, `aw_addinte`) VALUES
(2, '第一次运动会', '一等奖', '2022-07-06', 1),
(2, '测试', '一等奖', '2022-08-02', 1),
(2, '测试提交审核', '第一次', '2022-08-02', 1),
(3, '测试22', '一', '2022-10-03', 1),
(2, 'user002', 'user', '2022-10-09', 1),
(11, 'asdsa', 'aaa', '2022-10-04', 2);

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

--
-- 转存表中的数据 `details`
--

INSERT INTO `details` (`id`, `activ_id`, `deta_evaluation`, `deta_win`) VALUES
(2, 1, '非常好', 1),
(3, 1, '还不错', 0),
(2, 2, '测试测试测试活动评价', 0),
(2, 5, '', 0),
(2, 7, '', 0),
(2, 6, '', 0),
(3, 6, '', 0),
(11, 8, '', 0),
(2, 9, '', 0),
(3, 5, '', 0),
(3, 13, '', 0),
(14, 13, '', 0),
(15, 13, '', 0),
(15, 14, '', 0),
(2, 14, '', 0),
(3, 14, '', 0);

-- --------------------------------------------------------

--
-- 表的结构 `examine`
--

CREATE TABLE `examine` (
  `id` int(12) NOT NULL,
  `ex_id` int(12) NOT NULL,
  `ex_name` varchar(36) COLLATE utf8_bin NOT NULL,
  `ex_li` varchar(36) COLLATE utf8_bin NOT NULL,
  `ex_time` date NOT NULL,
  `ex_result` varchar(12) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `examine`
--

INSERT INTO `examine` (`id`, `ex_id`, `ex_name`, `ex_li`, `ex_time`, `ex_result`) VALUES
(2, 1, '测试', '一等奖', '2022-08-02', '通过'),
(2, 2, '测试提交审核', '第一次', '2022-08-02', '通过'),
(3, 3, '测试22', '一', '2022-10-03', '通过'),
(2, 4, 'user002', 'user', '2022-10-09', '通过'),
(11, 9, 'asdsa', 'aaa', '2022-10-04', '通过'),
(11, 10, 'qw', 'ewq', '2022-10-10', '待审核');

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

INSERT INTO `personal` (`id`, `name`, `sex`, `integral`, `department`, `jointime`, `age`) VALUES
(1, '张三', '男', 0, '管理员', '2022-07-01', '2001-02-02'),
(2, '小王', '男', 8, '语文部', '2022-07-02', '2001-05-02'),
(3, '小米', '女', 5, '实习部', '2022-07-03', '2000-02-02'),
(11, '小米2', '女', 3, '测试部', '2022-08-05', '1996-02-02'),
(12, '管理员2', '男', 0, '管理员', '2022-08-09', '1990-02-02'),
(13, '高级管理员', '男', 0, '管理员', '2022-08-22', '1986-02-02'),
(14, '小五', '男', 0, '测试部', '2022-08-16', '1989-02-02'),
(15, '用户cs', '男', 0, '文件部', '2022-08-16', '1981-07-23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`activ_id`),
  ADD UNIQUE KEY `activ_id` (`activ_id`),
  ADD UNIQUE KEY `activ_name` (`activ_name`);

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
  ADD PRIMARY KEY (`ex_id`),
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
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- 使用表AUTO_INCREMENT `activity`
--
ALTER TABLE `activity`
  MODIFY `activ_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- 使用表AUTO_INCREMENT `examine`
--
ALTER TABLE `examine`
  MODIFY `ex_id` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
