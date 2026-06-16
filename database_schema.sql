-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: bjtvotercollection
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `completecollection`
--

DROP TABLE IF EXISTS `completecollection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `completecollection` (
  `sr` int NOT NULL AUTO_INCREMENT,
  `number` int DEFAULT NULL,
  `id` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `father` varchar(100) DEFAULT NULL,
  `house` varchar(100) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `gender` varchar(100) DEFAULT NULL,
  `raw` varchar(50) DEFAULT NULL,
  `polling_station` varchar(1000) DEFAULT NULL,
  `station_address` varchar(1000) DEFAULT NULL,
  `deleted` varchar(50) DEFAULT NULL,
  `kinType` varchar(100) DEFAULT NULL,
  `extra` varchar(50) DEFAULT NULL,
  `year` int DEFAULT NULL,
  `date1` varchar(200) DEFAULT NULL,
  `date2` varchar(200) DEFAULT NULL,
  `add1` varchar(800) DEFAULT NULL,
  `add2` varchar(800) DEFAULT NULL,
  `postcode` int DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `family_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`sr`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hathras_78`
--

DROP TABLE IF EXISTS `hathras_78`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hathras_78` (
  `sno` int NOT NULL AUTO_INCREMENT,
  `id` varchar(50) DEFAULT NULL,
  `number` varchar(10) DEFAULT NULL,
  `name` varchar(80) DEFAULT NULL,
  `father` varchar(50) DEFAULT NULL,
  `house` varchar(50) DEFAULT NULL,
  `age` varchar(5) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `raw` varchar(10) DEFAULT NULL,
  `polling_station` varchar(100) DEFAULT NULL,
  `station_address` varchar(100) DEFAULT NULL,
  `deleted` varchar(10) DEFAULT NULL,
  `kinType` varchar(50) DEFAULT NULL,
  `extra` varchar(10) DEFAULT NULL,
  `year` varchar(10) DEFAULT NULL,
  `date1` varchar(50) DEFAULT NULL,
  `date2` varchar(50) DEFAULT NULL,
  `add1` varchar(100) DEFAULT NULL,
  `add2` varchar(100) DEFAULT NULL,
  `postcode` varchar(10) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `family_id` varchar(20) DEFAULT NULL,
  `booth_number` varchar(5) DEFAULT NULL,
  `add1_number` varchar(5) DEFAULT NULL,
  `add2_number` varchar(5) DEFAULT NULL,
  `jilla` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`sno`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jillapasskey`
--

DROP TABLE IF EXISTS `jillapasskey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jillapasskey` (
  `id` int NOT NULL AUTO_INCREMENT,
  `jilla` varchar(255) NOT NULL,
  `passkey` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `passkey` (`passkey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lokvidhan`
--

DROP TABLE IF EXISTS `lokvidhan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lokvidhan` (
  `sno` int NOT NULL AUTO_INCREMENT,
  `loksabha` varchar(100) DEFAULT NULL,
  `vidhansabha` varchar(100) DEFAULT NULL,
  `jilla` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`sno`),
  UNIQUE KEY `unik_lok_vid` (`loksabha`,`vidhansabha`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `master`
--

DROP TABLE IF EXISTS `master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `number` varchar(15) DEFAULT NULL,
  `loksabha` varchar(1000) DEFAULT NULL,
  `vidhansabha` varchar(1000) DEFAULT NULL,
  `polling_station` varchar(200) DEFAULT NULL,
  `station_address` varchar(200) DEFAULT NULL,
  `position` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `master_new`
--

DROP TABLE IF EXISTS `master_new`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `master_new` (
  `sno` int NOT NULL AUTO_INCREMENT,
  `jilla` varchar(150) DEFAULT NULL,
  `vidhansabha_no` varchar(50) DEFAULT NULL,
  `vidhansabha` varchar(200) DEFAULT NULL,
  `mandal_name` varchar(200) DEFAULT NULL,
  `shakti_kshtra` varchar(200) DEFAULT NULL,
  `personal_booth_no` varchar(100) DEFAULT NULL,
  `personal_booth_name` varchar(200) DEFAULT NULL,
  `booth_number` varchar(100) DEFAULT NULL,
  `worker_name` varchar(200) DEFAULT NULL,
  `position` varchar(150) DEFAULT NULL,
  `mobile_no` varchar(20) DEFAULT NULL,
  `allotted_table_name` varchar(300) DEFAULT NULL,
  `allotted_newvoter_table_name` varchar(300) DEFAULT NULL,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`sno`)
) ENGINE=InnoDB AUTO_INCREMENT=1296 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `masterjilla`
--

DROP TABLE IF EXISTS `masterjilla`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `masterjilla` (
  `sno` int NOT NULL AUTO_INCREMENT,
  `kshtra` varchar(200) DEFAULT NULL,
  `jilla` varchar(200) DEFAULT NULL,
  `vidhansabha_no` int DEFAULT NULL,
  `vidhansabha` varchar(250) DEFAULT NULL,
  `voter_table_name` varchar(300) DEFAULT NULL,
  `new_voter_table_name` varchar(300) DEFAULT NULL,
  `sir_voter_table_name` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`sno`)
) ENGINE=InnoDB AUTO_INCREMENT=404 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newfamily`
--

DROP TABLE IF EXISTS `newfamily`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `newfamily` (
  `sno` int NOT NULL AUTO_INCREMENT,
  `number` int DEFAULT NULL,
  `id` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `father` varchar(100) DEFAULT NULL,
  `house` varchar(100) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `raw` varchar(50) DEFAULT NULL,
  `polling_station` varchar(300) DEFAULT NULL,
  `station_address` varchar(500) DEFAULT NULL,
  `deleted` varchar(50) DEFAULT NULL,
  `kinType` varchar(100) DEFAULT NULL,
  `extra` varchar(50) DEFAULT NULL,
  `year` int DEFAULT NULL,
  `date1` varchar(200) DEFAULT NULL,
  `date2` varchar(200) DEFAULT NULL,
  `add1` varchar(800) DEFAULT NULL,
  `add2` varchar(800) DEFAULT NULL,
  `postcode` int DEFAULT NULL,
  `mukhiya` varchar(500) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `jati` varchar(200) DEFAULT NULL,
  `upjati` varchar(200) DEFAULT NULL,
  `mobileno` varchar(15) DEFAULT NULL,
  `voterof` varchar(50) DEFAULT NULL,
  `family_id` varchar(50) DEFAULT NULL,
  `votein2003` varchar(100) DEFAULT NULL,
  `formEF` varchar(100) DEFAULT NULL,
  `person_mobile_number` varchar(15) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`sno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newvoter`
--

DROP TABLE IF EXISTS `newvoter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `newvoter` (
  `id` int NOT NULL AUTO_INCREMENT,
  `family_id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `father` varchar(100) DEFAULT NULL,
  `house` varchar(255) DEFAULT NULL,
  `age` int NOT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `jati` varchar(100) DEFAULT NULL,
  `upjati` varchar(100) DEFAULT NULL,
  `mobileno` varchar(15) DEFAULT NULL,
  `person_mobile_number` varchar(15) DEFAULT NULL,
  `mukhiya` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `polling_station` varchar(255) DEFAULT NULL,
  `kinType` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT '',
  `number` varchar(50) DEFAULT NULL,
  `loksabha` varchar(255) DEFAULT NULL,
  `vidhansabha` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newvoter_hathras_78`
--

DROP TABLE IF EXISTS `newvoter_hathras_78`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `newvoter_hathras_78` (
  `sno` int NOT NULL AUTO_INCREMENT,
  `number` varchar(6) DEFAULT NULL,
  `id` varchar(50) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `father` varchar(100) DEFAULT NULL,
  `house` varchar(100) DEFAULT NULL,
  `age` varchar(5) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `raw` varchar(50) DEFAULT NULL,
  `polling_station` varchar(300) DEFAULT NULL,
  `station_address` varchar(500) DEFAULT NULL,
  `deleted` varchar(50) DEFAULT NULL,
  `kinType` varchar(100) DEFAULT NULL,
  `extra` varchar(50) DEFAULT NULL,
  `year` varchar(10) DEFAULT NULL,
  `date1` varchar(200) DEFAULT NULL,
  `date2` varchar(200) DEFAULT NULL,
  `add1` varchar(250) DEFAULT NULL,
  `add2` varchar(250) DEFAULT NULL,
  `jilla` varchar(250) DEFAULT NULL,
  `postcode` varchar(10) DEFAULT NULL,
  `mukhiya` varchar(250) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `jati` varchar(150) DEFAULT NULL,
  `upjati` varchar(150) DEFAULT NULL,
  `mobileno` varchar(11) DEFAULT NULL,
  `voterof` varchar(50) DEFAULT NULL,
  `family_id` varchar(50) DEFAULT NULL,
  `votein2003` varchar(100) DEFAULT NULL,
  `formEF` varchar(100) DEFAULT NULL,
  `person_mobile_number` varchar(15) DEFAULT NULL,
  `booth_number` varchar(5) DEFAULT NULL,
  `add1_number` varchar(5) DEFAULT NULL,
  `add2_number` varchar(5) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`sno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `newvotercollection`
--

DROP TABLE IF EXISTS `newvotercollection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `newvotercollection` (
  `sno` int NOT NULL AUTO_INCREMENT,
  `number` int DEFAULT NULL,
  `id` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `father` varchar(100) DEFAULT NULL,
  `house` varchar(100) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `raw` varchar(50) DEFAULT NULL,
  `polling_station` varchar(300) DEFAULT NULL,
  `station_address` varchar(500) DEFAULT NULL,
  `deleted` varchar(50) DEFAULT NULL,
  `kinType` varchar(100) DEFAULT NULL,
  `extra` varchar(50) DEFAULT NULL,
  `year` int DEFAULT NULL,
  `date1` varchar(200) DEFAULT NULL,
  `date2` varchar(200) DEFAULT NULL,
  `add1` varchar(800) DEFAULT NULL,
  `add2` varchar(800) DEFAULT NULL,
  `postcode` int DEFAULT NULL,
  `mukhiya` varchar(500) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `jati` varchar(200) DEFAULT NULL,
  `upjati` varchar(200) DEFAULT NULL,
  `mobileno` bigint DEFAULT NULL,
  `voterof` varchar(50) DEFAULT NULL,
  `family_id` varchar(50) DEFAULT NULL,
  `votein2003` varchar(100) DEFAULT NULL,
  `formEF` varchar(100) DEFAULT NULL,
  `person_mobile_number` varchar(15) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`sno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pollingvidhan`
--

DROP TABLE IF EXISTS `pollingvidhan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pollingvidhan` (
  `sno` int NOT NULL AUTO_INCREMENT,
  `vidhansabha` varchar(100) DEFAULT NULL,
  `station_address` varchar(200) DEFAULT NULL,
  `polling_station` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`sno`),
  UNIQUE KEY `unik_polling` (`vidhansabha`,`station_address`,`polling_station`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `registerdata`
--

DROP TABLE IF EXISTS `registerdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registerdata` (
  `sno` int NOT NULL AUTO_INCREMENT,
  `number` varchar(15) DEFAULT NULL,
  `otp` int DEFAULT NULL,
  PRIMARY KEY (`sno`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sir_hathras_78`
--

DROP TABLE IF EXISTS `sir_hathras_78`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sir_hathras_78` (
  `sno` int NOT NULL AUTO_INCREMENT,
  `id` varchar(50) DEFAULT NULL,
  `number` varchar(10) DEFAULT NULL,
  `name` varchar(80) DEFAULT NULL,
  `father` varchar(50) DEFAULT NULL,
  `house` varchar(50) DEFAULT NULL,
  `age` varchar(5) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `raw` varchar(10) DEFAULT NULL,
  `polling_station` varchar(100) DEFAULT NULL,
  `station_address` varchar(100) DEFAULT NULL,
  `deleted` varchar(10) DEFAULT NULL,
  `kinType` varchar(50) DEFAULT NULL,
  `extra` varchar(10) DEFAULT NULL,
  `year` varchar(10) DEFAULT NULL,
  `date1` varchar(50) DEFAULT NULL,
  `date2` varchar(50) DEFAULT NULL,
  `add1` varchar(100) DEFAULT NULL,
  `add2` varchar(100) DEFAULT NULL,
  `postcode` varchar(10) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `family_id` varchar(20) DEFAULT NULL,
  `booth_number` varchar(5) DEFAULT NULL,
  `add1_number` varchar(5) DEFAULT NULL,
  `add2_number` varchar(5) DEFAULT NULL,
  `jilla` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`sno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `unassigned`
--

DROP TABLE IF EXISTS `unassigned`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unassigned` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(500) DEFAULT NULL,
  `loksabha` varchar(500) DEFAULT NULL,
  `vidhansabha` varchar(500) DEFAULT NULL,
  `mobileno` varchar(15) DEFAULT NULL,
  `postion` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `userlogin`
--

DROP TABLE IF EXISTS `userlogin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userlogin` (
  `sno` int NOT NULL AUTO_INCREMENT,
  `passkey` int DEFAULT NULL,
  PRIMARY KEY (`sno`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `votercount`
--

DROP TABLE IF EXISTS `votercount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `votercount` (
  `sno` int NOT NULL AUTO_INCREMENT,
  `jilla` varchar(200) DEFAULT NULL,
  `vidhansabha` varchar(200) DEFAULT NULL,
  `polling_station` varchar(200) DEFAULT NULL,
  `totalvoter` bigint unsigned DEFAULT '0',
  `completedvoter` bigint unsigned DEFAULT '0',
  `booth_number` varchar(20) DEFAULT NULL,
  `vidhansabha_no` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`sno`),
  UNIQUE KEY `unique_jilla_vidhan_polling` (`jilla`,`vidhansabha`,`polling_station`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-16 12:37:20
