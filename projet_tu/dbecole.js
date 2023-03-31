const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('school.db');
const crypto = require('security.js');



//Création de la table des écoles de l'enseignement supérieur
db.run("CREATE TABLE IF NOT EXISTS schools (id INTEGER PRIMARY KEY, name TEXT NOT NULL, type TEXT NOT NULL, address TEXT NOT NULL, degree TEXT NOT NULL, ects_credits INTEGER)");

//Ajout d'une école
const name = "Université de Paris";
const type = "Université";
const address = "Paris, France";
const degree = "Licence en Mathématiques";
const ects_credits = 180;

db.run("INSERT INTO schools (name, type, address, degree, ects_credits) VALUES (?, ?, ?, ?, ?)", name, type, address, degree, ects_credits);

//Récupération des écoles
db.all("SELECT * FROM schools", [], (err, rows) => {
  rows.forEach((row) => {
    console.log(row.id, row.name, row.type, row.address, row.degree, row.ects_credits);
  });
});

db.close();
