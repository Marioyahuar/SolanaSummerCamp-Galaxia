-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-08-2022 a las 04:26:30
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `test`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `donations`
--

CREATE TABLE `donations` (
  `DonationID` int(11) NOT NULL,
  `User` text DEFAULT NULL,
  `TxHash` text DEFAULT NULL,
  `ProjectId` int(11) DEFAULT NULL,
  `RewardId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `projects1`
--

CREATE TABLE `projects1` (
  `ID` int(11) NOT NULL,
  `Category` text DEFAULT NULL,
  `ProjectName` varchar(200) DEFAULT 'NuevoProyecto',
  `Description` text NOT NULL DEFAULT '\'Agregar descripcion del proyecto\'',
  `Images` text NOT NULL DEFAULT '\'/images/project_\'',
  `SolGoal` float DEFAULT 0,
  `DateLimit` timestamp NOT NULL DEFAULT current_timestamp(),
  `Twitter` text DEFAULT NULL,
  `Discord` text DEFAULT NULL,
  `Facebook` text DEFAULT NULL,
  `Medium` text DEFAULT NULL,
  `ReasonsToInvest` text NOT NULL DEFAULT '\'Es el mejor proyecto de todos\'',
  `LongDescription` text NOT NULL DEFAULT 'Descripcion larga del proyecto',
  `Team` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`Team`)),
  `Risks` text NOT NULL DEFAULT 'Do your own research',
  `Terms` text NOT NULL DEFAULT 'Terminos por defecto',
  `Rewards` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`Rewards`)),
  `ProjectOwner` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `projects1`
--

INSERT INTO `projects1` (`ID`, `Category`, `ProjectName`, `Description`, `Images`, `SolGoal`, `DateLimit`, `Twitter`, `Discord`, `Facebook`, `Medium`, `ReasonsToInvest`, `LongDescription`, `Team`, `Risks`, `Terms`, `Rewards`, `ProjectOwner`) VALUES
(1, 'Collections', 'Proyecto 1', 'El primer proyecto de todos', '/images/project_', 100, '2022-08-16 01:41:35', 'https://twitter.com/YahuarcaniMario', 'https://discord.gg/hRjVdbHb', 'https://www.facebook.com/mario.yahuarcani', NULL, 'First reason,Second reason,Third Reason', 'Descripcion larga del proyecto', NULL, 'Do your own research', 'Terminos por defecto', '[\n    {\n      \"id\": \"0\",\n      \"name\": \"Reward1\",\n      \"minPrice\": \"0.1\",\n      \"description\": \"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas.\",\n      \"perksIncluded\": [\n        \"Lorem ipsum dolor sit amet.\"\n      ],\n      \"estimatedDeliverDate\": \"new Date(\'2022-11-25\')\",\n      \"patronsQuantity\": \"9\",\n\"stock\": \"5\"\n    }\n]', '4sgJSUKJLBpnw7kUdNFWCK6EZqtkB3MXooHcFJYbPY8v'),
(2, 'Collections', 'Proyecto 2', 'El segundo', '/images/project_', 50, '2022-08-18 05:00:00', NULL, NULL, NULL, NULL, 'Es el mejor proyecto de todos', 'Descripcion larga del proyecto', NULL, 'Do your own research', 'Terminos por defecto', NULL, 'rNFaZ6DtevRSGtRsbuzo8Y4mLaVW5KqS9kE87nNcAgB'),
(3, 'P2E Games', 'Proyecto 3', 'El tercero', '/images/project_', 150, '2022-08-21 01:41:35', NULL, NULL, NULL, NULL, 'Es el mejor proyecto de todos', 'Descripcion larga del proyecto', '{\n    \"name\": \"Team Name\",\n    \"imgUrl\": \"undefined\",\n    \"description\": \"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas. Quisque pharetra pellentesque sapien elementum ipsum euismod diam eget ut\"\n}', 'Do your own research', 'Terminos por defecto', '[\n    {\n      \"id\": \"0\",\n      \"name\": \"Reward1\",\n      \"minPrice\": \"0.2\",\n      \"description\": \"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas.\",\n      \"perksIncluded\": [\n        \"Lorem ipsum dolor sit amet.\"\n      ],\n      \"estimatedDeliverDate\": \"new Date(\'2022-11-25\')\",\n      \"patronsQuantity\": \"45\"\n    }\n]', 'BrFGbvsEL2Yh4Q4MnfiQYMcNArPfsUQhQS9ZMEYXoqdG'),
(4, 'P2E Games', 'Proyecto 4', 'El cuarto', '/images/project_', 25, '2022-08-22 01:41:35', NULL, NULL, NULL, NULL, 'Es el mejor proyecto de todos', 'Descripcion larga del proyecto', '{\r\n    \"name\": \"Team Name\",\r\n    \"imgUrl\": \"undefined\",\r\n    \"description\": \"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas. Quisque pharetra pellentesque sapien elementum ipsum euismod diam eget ut\"\r\n}', 'Do your own research', 'Terminos por defecto', '[\n    {\n      \"id\": \"0\",\n      \"name\": \"Reward1\",\n      \"minPrice\": \"0.25\",\n      \"description\": \"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas.\",\n      \"perksIncluded\": [\n        \"Lorem ipsum dolor sit amet.\"\n      ],\n      \"estimatedDeliverDate\": \"new Date(\'2022-11-25\')\",\n      \"patronsQuantity\": \"45\"\n    ,\n\"stock\":\"5\"},\n{\n      \"id\": \"1\",\n      \"name\": \"Reward2\",\n      \"minPrice\": \"0.5\",\n      \"description\": \"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas.\",\n      \"perksIncluded\": [\n        \"Lorem ipsum dolor sit amet.\"\n      ],\n      \"estimatedDeliverDate\": \"new Date(\'2022-11-25\')\",\n      \"patronsQuantity\": \"0\"\n    ,\n\"stock\":\"10\"}\n]', 'rRRgAtSu1GXh9gTn67NPG8dZGXthCE8myWrujZHdWVv'),
(5, 'Solutions', 'Proyecto 5', 'El quinto', '/images/project_', 25, '2022-08-17 01:41:35', NULL, NULL, NULL, NULL, 'Es el mejor proyecto de todos', 'Descripcion larga del proyecto', '{\r\n    \"name\": \"Team Name\",\r\n    \"imgUrl\": \"undefined\",\r\n    \"description\": \"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas. Quisque pharetra pellentesque sapien elementum ipsum euismod diam eget ut\"\r\n}', 'Do your own research', 'Terminos por defecto', '[\n    {\n      \"id\": \"0\",\n      \"name\": \"Reward1\",\n      \"minPrice\": \"0.05\",\n      \"description\": \"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum lectus dictum risus enim egestas.\",\n      \"perksIncluded\": [\n        \"Lorem ipsum dolor sit amet.\"\n      ],\n      \"estimatedDeliverDate\": \"new Date(\'2022-11-25\')\",\n      \"patronsQuantity\": \"45\"\n    }\n]', '5WmFmHsVRfm2QH12Sr6DZHdTn7tcxB66o9EZZzGxSgA4');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`DonationID`);

--
-- Indices de la tabla `projects1`
--
ALTER TABLE `projects1`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `donations`
--
ALTER TABLE `donations`
  MODIFY `DonationID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `projects1`
--
ALTER TABLE `projects1`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
