CREATE DATABASE  IF NOT EXISTS `livraria_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `livraria_db`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: livraria_db
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `clientes_db`
--

DROP TABLE IF EXISTS `clientes_db`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes_db` (
  `idCliente` int NOT NULL AUTO_INCREMENT,
  `nomeCliente` varchar(200) NOT NULL,
  `dataNascimento` varchar(8) NOT NULL,
  `emailCliente` varchar(255) NOT NULL,
  `totalPedidos` int NOT NULL,
  PRIMARY KEY (`idCliente`),
  UNIQUE KEY `idclientes_db_UNIQUE` (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes_db`
--

LOCK TABLES `clientes_db` WRITE;
/*!40000 ALTER TABLE `clientes_db` DISABLE KEYS */;
INSERT INTO `clientes_db` VALUES (1,'Elias','21042003','eliasnv21@gmail.com',5),(2,'Daniela','17082000','daniela.facs@gmail.com',1),(3,'Rafael','04092002','rafael.rocha@gmail.com',0),(4,'Marhmed','30072004','alahuakbah@gmail.com',2),(5,'Marcelo','24052001','marcelo.copis@gmail.com',0);
/*!40000 ALTER TABLE `clientes_db` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estoquelivros_db`
--

DROP TABLE IF EXISTS `estoquelivros_db`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estoquelivros_db` (
  `idLivro` int NOT NULL AUTO_INCREMENT,
  `nomeLivro` varchar(200) NOT NULL,
  `categoriaLivro` varchar(60) NOT NULL,
  `anoLivro` int NOT NULL,
  `precoLivro` varchar(45) NOT NULL,
  `qtdLivro` int NOT NULL,
  PRIMARY KEY (`idLivro`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estoquelivros_db`
--

LOCK TABLES `estoquelivros_db` WRITE;
/*!40000 ALTER TABLE `estoquelivros_db` DISABLE KEYS */;
INSERT INTO `estoquelivros_db` VALUES (1,'Sombra e Ossos','Fantasia',2015,'49.90',28),(2,'O Pequeno Principe','Fantasia',1943,'29.90',50),(4,'O Gato de Botas','Acao',1990,'18.50',20),(5,'A Perquena Sereia','Romance',1998,'15.90',44),(6,'Dom Quixote','Epoca',1612,'59.90',7),(7,'O Senhor dos Aneis','Fantasia',1954,'30.00',20),(8,'Harry Potter e a Pedra Filosofal','Fantasia',1997,'45.90',34),(9,'Memorias Postumas de Bras Cubas','Realista',1881,'35.90',15),(10,'Moby Dick','Aventura',1851,'19.90',9),(11,'Madame Bovary','Romance',1856,'49.90',50),(12,'O Processo','Epoca',1925,'50.90',25),(13,'Hamlet','1609',1609,'18.90',15);
/*!40000 ALTER TABLE `estoquelivros_db` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos_db`
--

DROP TABLE IF EXISTS `pedidos_db`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos_db` (
  `idPedido` int NOT NULL AUTO_INCREMENT,
  `idCliente` int NOT NULL,
  `idLivro` int NOT NULL,
  `qtdPedido` int NOT NULL,
  `totalPedido` varchar(45) NOT NULL,
  `dataPedido` varchar(8) NOT NULL,
  PRIMARY KEY (`idPedido`),
  UNIQUE KEY `idpedidos_db_UNIQUE` (`idPedido`),
  KEY `idCliente_idx` (`idCliente`),
  KEY `idLivro_idx` (`idLivro`),
  CONSTRAINT `idCliente` FOREIGN KEY (`idCliente`) REFERENCES `clientes_db` (`idCliente`),
  CONSTRAINT `idLivro` FOREIGN KEY (`idLivro`) REFERENCES `estoquelivros_db` (`idLivro`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos_db`
--

LOCK TABLES `pedidos_db` WRITE;
/*!40000 ALTER TABLE `pedidos_db` DISABLE KEYS */;
INSERT INTO `pedidos_db` VALUES (12,1,1,2,'99.80','09122023'),(13,1,8,1,'45.90','09122023'),(14,1,10,10,'199','09122023'),(15,1,10,10,'199','09122023'),(16,2,10,1,'19.90','09122023'),(17,4,5,1,'15.90','09122023'),(18,4,12,20,'1.018','09122023'),(19,1,6,3,'152.70','09122023');
/*!40000 ALTER TABLE `pedidos_db` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-09 20:08:33
