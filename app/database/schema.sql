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
  `url` VARCHAR(100) NOT NULL,
  `title` VARCHAR(100) NULL DEFAULT NULL,
  `outgoing` VARCHAR(10) NULL DEFAULT NULL,
  `incoming` VARCHAR(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'urlMap'
-- 
-- ---

DROP TABLE IF EXISTS `urlMap`;
    
CREATE TABLE `urlMap` (
  `urlId` TINYINT NULL DEFAULT NULL,
  `linkId` TINYINT NULL DEFAULT NULL
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `urlMap` ADD FOREIGN KEY (urlId) REFERENCES `urlLinks` (`id`);
ALTER TABLE `urlMap` ADD FOREIGN KEY (linkId) REFERENCES `urlLinks` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `urlLinks` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `urlMap` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `urlLinks` (`id`,`url`,`title`,`outgoing`,`incoming`) VALUES
-- ('','','','','');
-- INSERT INTO `urlMap` (`urlId`,`linkId`) VALUES
-- ('','');
