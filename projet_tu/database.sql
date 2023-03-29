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

INSERT INTO users (id, username, password, email, registration_date)
VALUES
  (1, 'johndoe', 'mypassword', 'johndoe@example.com', '2022-01-01'),
  (2, 'janedoe', 'janepassword', 'janedoe@example.com', '2022-02-15'),
  (3, 'bobsmith', 'bobpassword', 'bobsmith@example.com', '2022-03-23'),
  (4, 'alicewonder', 'alicepassword', 'alicewonder@example.com', '2022-04-30'),
  (5, 'tomjones', 'tompasword', 'tomjones@example.com', '2022-05-15');

INSERT INTO schools (id, name, type, address, degree, ects_credits)
VALUES
  (1, 'Université de Paris', 'Université', 'Paris, France', 'Licence en Mathématiques', 180),
  (2, 'École polytechnique', 'Grande école', 'Palaiseau, France', 'Diplôme d\''ingénieur', 300),
  (3, 'Sorbonne Université', 'Université', 'Paris, France', 'Master en Histoire', 120),
  (4, 'HEC Paris', 'Grande école', 'Jouy-en-Josas, France', 'Master en Management', 120),
  (5, 'École normale supérieure de Lyon', 'Grande école', 'Lyon, France', 'Doctorat en Biologie', 480);


