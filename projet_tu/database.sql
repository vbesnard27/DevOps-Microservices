-- Création de la table des comptes d'utilisateurs
CREATE TABLE users (
  id INT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  registration_date DATE
);

-- Création de la table des écoles de l'enseignement supérieur
CREATE TABLE schools (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  address VARCHAR(200) NOT NULL,
  degree VARCHAR(100) NOT NULL,
  ects_credits INT
);
