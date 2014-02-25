DROP DATABASE IF EXISTS `wikiUrls`;
CREATE DATABASE `wikiUrls`;
USE `wikiUrls`;

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'urlLinks'
-- 
-- ---

DROP TABLE IF EXISTS `urlLinks`;
    
CREATE TABLE `urlLinks` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `url` VARCHAR(100) NOT NULL DEFAULT 'NULL',
  `title` VARCHAR(100) NOT NULL DEFAULT 'NULL',
  `incoming` VARCHAR(100) NULL DEFAULT NULL,
  `outgoing` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'urlMap'
-- 
-- ---

DROP TABLE IF EXISTS `urlMap`;
    
CREATE TABLE `urlMap` (
  `id` TINYINT NOT NULL,
  `linkId` TINYINT NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `urlMap` ADD FOREIGN KEY (id) REFERENCES `urlLinks` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `urlLinks` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `urlMap` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `urlLinks` (`id`,`url`,`title`,`incoming`,`outgoing`) VALUES
-- ('','','','','');
-- INSERT INTO `urlMap` (`id`,`linkId`) VALUES
-- ('','');
