-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  sam. 18 mai 2019 à 13:37
-- Version du serveur :  10.1.25-MariaDB
-- Version de PHP :  7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `iomt`
--

-- --------------------------------------------------------

--
-- Structure de la table `notification`
--

CREATE TABLE `notification` 
(
  `id` int(11) NOT NULL,
  `title` varchar(40) DEFAULT NULL,
  `content` varchar(80) DEFAULT NULL,
  `idu` int(11) DEFAULT NULL,
  `ido` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `notification`
--

INSERT INTO `notification` (`id`, `title`, `content`, `idu`, `ido`) VALUES
(1, 'problem 1', 'text of the problem 1', 4, 1),
(2, 'probelm 2', 'text de sais', 4, 3);

-- --------------------------------------------------------

--
-- Structure de la table `object`
--

CREATE TABLE `object` 
(
  `id` int(11) NOT NULL,
  `wording` varchar(40) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `object`
--

INSERT INTO `object` (`id`, `wording`, `state`, `latitude`, `longitude`) VALUES
(1, 'Server of Sesame', 95, 36.869287, 10.196011),
(2, 'Machine of iot', 50, 36.8975331, 10.1928377),
(3, 'Switch', 66, 36.8975331, 10.1926389),
(5, 'Testor', 30, 36.8975331, 10.1926489);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` 
(
  `id` int(11) NOT NULL,
  `first_name` varchar(40) DEFAULT NULL,
  `last_name` varchar(40) DEFAULT NULL,
  `rule` int(11) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `rule`, `email`, `password`, `created`) VALUES
(3, 'Anas', 'Najjar', 1, 'anas.najjar@sesame.com.tn', '$2b$10$ADQJEK5cDLd5vedn5Ryfx.TI0nj5kgN1gotfs.bjzwYou64neQ3BK', '2019-05-03'),
(4, 'Hbib', 'Arwa', 0, 'habib.aroua@sesame.com.tn', '$2b$10$P9pPx7iqDQkd8n3VG0WiZOl343McXTKYvudBDSwK5GpG9Abj94bBy', '2019-05-04'),
(5, 'Conan', 'Edogawa', 1, 'conan.edogawa@anime.com.jp', '$2b$10$13Jx.dGDP981QqLW4OsKGerNSd8RJjWJ1of5jvSmnrX73NKpNVowu', '2019-05-05'),
(6, 'Imen', 'Trabelsi', 1, 'imen.trabelsi@sesame.com.tn', '$2b$10$db9ZfgbZwnWsyL2xpDejOOIFuvXyMHopkIHwzZthHr/l4eRmhC6je', '2019-05-11'),
(8, 'Salah', 'Abdelkader', 1, 'salah.benabdelkader@sesame.com.tn', '$2b$10$8nJBUkERsT1gBYbrZ3rKOeDWAOXHexTYb6KF1Z32r/TvGeG2mbsUm', '2019-05-11'),
(11, 'Laila', 'Yermani', 1, 'laila.yermani@yahoo.com', '$2b$10$n1/k7TWV478M8FjOIRDQDuqsJmoIzTuo9cZmPW6Sn0kD5ZNLkFjuK', '2019-05-11'),
(14, 'Fatma', 'Somaa', 1, 'fatma.somaa@sesame.com.tn', '$2b$10$L87iUUnmXkFct8Jglez6buHP/wOF0EJGbWSFHLnqyg5/TxPvWQUPa', '2019-05-14');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk3` (`idu`),
  ADD KEY `fk4` (`ido`);

--
-- Index pour la table `object`
--
ALTER TABLE `object`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `object`
--
ALTER TABLE `object`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `fk3` FOREIGN KEY (`idu`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `fk4` FOREIGN KEY (`ido`) REFERENCES `object` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
