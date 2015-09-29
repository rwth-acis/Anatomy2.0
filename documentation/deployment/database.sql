-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: buche.informatik.rwth-aachen.de:3306
-- Erstellungszeit: 17. Sep 2015 um 14:34
-- Server Version: 5.5.41-0ubuntu0.12.04.1
-- PHP-Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `3dnrtdev`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `courses`
--

CREATE TABLE IF NOT EXISTS `courses` (
`id` int(11) NOT NULL COMMENT 'find corresponding models with this id',
  `name` varchar(64) NOT NULL,
  `description` text,
  `creator` int(11) NOT NULL COMMENT 'correlates with user table',
  `role_url` text NOT NULL,
  `contact` varchar(1000) DEFAULT NULL,
  `dates` varchar(1000) DEFAULT NULL,
  `links` varchar(1000) DEFAULT NULL,
  `edit_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `subject_id` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=156 ;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `course_models`
--

CREATE TABLE IF NOT EXISTS `course_models` (
  `course_id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `models`
--

CREATE TABLE IF NOT EXISTS `models` (
`id` int(11) NOT NULL,
  `seviannoId` int(10) DEFAULT NULL,
  `name` varchar(1024) DEFAULT NULL,
  `description` varchar(4096) DEFAULT NULL,
  `classification` varchar(1024) DEFAULT NULL,
  `upload_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `size` varchar(32) DEFAULT NULL,
  `data_url` varchar(1024) NOT NULL,
  `preview_url` varchar(1024) DEFAULT NULL,
  `uploaded_by` int(11) DEFAULT NULL COMMENT 'id from table users'
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=185 ;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `subjects`
--

CREATE TABLE IF NOT EXISTS `subjects` (
`id` int(11) NOT NULL COMMENT 'find corresponding models with this id',
  `name` varchar(64) NOT NULL,
  `img_url` text NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=71 ;

--
-- Daten für Tabelle `subjects`
--

INSERT INTO `subjects` (`id`, `name`, `img_url`) VALUES
(1, 'Anatomy', '../images/AnatomyInMotion_iPhone_Icon_512.png'),
(60, 'Archaelogy', '../images/icon-512.png'),
(62, 'Architecture', '../images/architecture_icon.jpg'),
(63, 'Automotive Engineering', '../images/19ecf870b26f818bd0d1f5d38e3364cf.png'),
(64, 'Chemistry', '../images/chemistry_icon.png'),
(65, 'Computer Graphics', '../images/vector_266_12-01-512.png');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`id` int(11) NOT NULL,
  `email` varchar(128) NOT NULL,
  `given_name` varchar(256) DEFAULT NULL,
  `family_name` varchar(256) DEFAULT NULL,
  `confirmed` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `openIdConnectSub` varchar(255) DEFAULT NULL,
  `affiliation` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `street` varchar(100) DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=132 ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
 ADD PRIMARY KEY (`id`), ADD KEY `index_creator` (`creator`), ADD KEY `FK_Subjects_Course` (`subject_id`);

--
-- Indexes for table `course_models`
--
ALTER TABLE `course_models`
 ADD UNIQUE KEY `uq_course_models` (`course_id`,`model_id`), ADD KEY `fk_course_models_models` (`model_id`);

--
-- Indexes for table `models`
--
ALTER TABLE `models`
 ADD PRIMARY KEY (`id`), ADD KEY `index_uploaded_by` (`uploaded_by`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `uq_email_pass` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'find corresponding models with this id',AUTO_INCREMENT=156;
--
-- AUTO_INCREMENT for table `models`
--
ALTER TABLE `models`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=185;
--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'find corresponding models with this id',AUTO_INCREMENT=71;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=132;
--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `courses`
--
ALTER TABLE `courses`
ADD CONSTRAINT `FK_Subjects_Course` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`),
ADD CONSTRAINT `fk_courses_users` FOREIGN KEY (`creator`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Constraints der Tabelle `course_models`
--
ALTER TABLE `course_models`
ADD CONSTRAINT `fk_course_models_courses` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON UPDATE CASCADE,
ADD CONSTRAINT `fk_course_models_models` FOREIGN KEY (`model_id`) REFERENCES `models` (`id`) ON UPDATE CASCADE;

--
-- Constraints der Tabelle `models`
--
ALTER TABLE `models`
ADD CONSTRAINT `fk_models_users` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
