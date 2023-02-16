DROP DATABASE IF EXISTS dadosmysql;
CREATE DATABASE dadosmysql;
USE dadosmysql;
CREATE TABLE `players` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `totalGames` int DEFAULT '0',
  `gamesWon` int DEFAULT '0',
  `wonRate` decimal(10,2) DEFAULT '0',
  PRIMARY KEY (`id`)
);
CREATE TABLE `playHistory` (
  `id` int NOT NULL AUTO_INCREMENT,
  `indice` int DEFAULT NULL,
  `dice1` int DEFAULT NULL,
  `dice2` int DEFAULT NULL,
  `score` int DEFAULT NULL,
  `veredict` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fid_idx` (`indice`),
  CONSTRAINT `fid` FOREIGN KEY (`indice`) REFERENCES `players` (`id`)
);
CREATE TABLE `users`(
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(128) UNIQUE NOT NULL,
  `password` varchar(128) NOT NULL,
   PRIMARY KEY (`id`)
);