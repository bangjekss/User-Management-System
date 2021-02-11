-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: jcwm15
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cartdb`
--

DROP TABLE IF EXISTS `cartdb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartdb` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `productID` int NOT NULL,
  `qty` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartdb`
--

LOCK TABLES `cartdb` WRITE;
/*!40000 ALTER TABLE `cartdb` DISABLE KEYS */;
INSERT INTO `cartdb` VALUES (1,15,12,1),(2,15,13,2),(3,16,14,3),(4,18,12,4),(5,18,12,5);
/*!40000 ALTER TABLE `cartdb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` varchar(200) NOT NULL,
  `time` varchar(45) NOT NULL,
  `userID` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=168 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
INSERT INTO `chat` VALUES (160,'heloow','10:26 PM',45),(161,'hii','10:31 PM',45),(162,'halooo','10:40 PM',45),(163,'acong','10:40 PM',45),(164,'aww','10:41 PM',45),(165,'a','10:42 PM',45),(166,'skuy','10:42 PM',45),(167,'okkk','10:44 PM',45);
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagedb`
--

DROP TABLE IF EXISTS `imagedb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagedb` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imagePath` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagedb`
--

LOCK TABLES `imagedb` WRITE;
/*!40000 ALTER TABLE `imagedb` DISABLE KEYS */;
INSERT INTO `imagedb` VALUES (2,'/imagedb/IMG1611385020267.jpg');
/*!40000 ALTER TABLE `imagedb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productdb`
--

DROP TABLE IF EXISTS `productdb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productdb` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(45) NOT NULL,
  `harga` int NOT NULL,
  `caption` varchar(200) NOT NULL,
  `stock` int NOT NULL,
  `isAvailable` tinyint(1) NOT NULL,
  `imagePath` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productdb`
--

LOCK TABLES `productdb` WRITE;
/*!40000 ALTER TABLE `productdb` DISABLE KEYS */;
INSERT INTO `productdb` VALUES (11,'Apel',10000,'test-caption Apel',10,1,'/productdb/PRD1611499835958.jpg'),(12,'Duren',20000,'test-caption Duren',10,1,'/productdb/PRD1611499444586.png'),(13,'Rambutan',30000,'test-caption Rambutan',10,0,''),(14,'Pisang',40000,'test-caption pisang',10,0,''),(15,'Mangga',50000,'Mangga harum manis',10,1,'/productdb/PRD1611499495054.jpg'),(18,'Jeruk Bali',30000,'jeruk enak',11,1,'/productdb/PRD1611499569235.png'),(19,'Jambu',40000,'Jambu wenak',8,1,'/productdb/PRD1611499606732.jpg'),(20,'Apel Fuji',10000,'Jepang punya',8,1,'/productdb/PRD1611499694062.jpg'),(24,'Alpukat',40000,'joss',8,1,'/productdb/PRD1611499868387.jpg'),(27,'Naga',20000,'dargon',11,1,'/productdb/PRD1611495665218.jpg');
/*!40000 ALTER TABLE `productdb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roledb`
--

DROP TABLE IF EXISTS `roledb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roledb` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roledb`
--

LOCK TABLES `roledb` WRITE;
/*!40000 ALTER TABLE `roledb` DISABLE KEYS */;
INSERT INTO `roledb` VALUES (1,'admin'),(2,'user');
/*!40000 ALTER TABLE `roledb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userID` int NOT NULL,
  `date` datetime DEFAULT NULL,
  `total` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,15,'2021-01-12 11:58:00',300000);
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactionitem`
--

DROP TABLE IF EXISTS `transactionitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactionitem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `transactionID` int NOT NULL,
  `productID` int NOT NULL,
  `qty` int NOT NULL,
  `harga` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactionitem`
--

LOCK TABLES `transactionitem` WRITE;
/*!40000 ALTER TABLE `transactionitem` DISABLE KEYS */;
INSERT INTO `transactionitem` VALUES (1,1,12,5,20000),(2,1,14,5,40000);
/*!40000 ALTER TABLE `transactionitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userdb`
--

DROP TABLE IF EXISTS `userdb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userdb` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(64) NOT NULL,
  `alamat` varchar(45) DEFAULT NULL,
  `roleID` int NOT NULL,
  `verified` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userdb`
--

LOCK TABLES `userdb` WRITE;
/*!40000 ALTER TABLE `userdb` DISABLE KEYS */;
INSERT INTO `userdb` VALUES (15,'lianeddy','lian.eddy@gmail.com','asd123','BSD',1,0),(16,'Susilo','susilo@mail.com','asd','Bandung',1,0),(18,'joko123','joko@mail.com','asd','Bandung',2,0),(22,'bangjek','bangjek@gmail.com','d4b7514113fc3d68852f626dc2957775475e988db0b8a8a732bc4f5cb992fb92','Tangerang',2,0),(23,'eaea','eaea@gmail.com','b1c3909f31d211502e3bd611f6987d3302c37ccc9eb571206a3185536e58dd13','Tangerang',2,0),(44,'asdfsadf','sadfas@g.id','f53bcdd5500f510cb091579cc62cf4f57c87b183a58fac53400e47d430764b8d',NULL,2,0),(45,'mrazak.qq','razak9098@gmail.com','f53bcdd5500f510cb091579cc62cf4f57c87b183a58fac53400e47d430764b8d',NULL,2,1);
/*!40000 ALTER TABLE `userdb` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-03  8:32:25
