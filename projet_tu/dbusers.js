const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('users.db');
const crypto = require('security.js');


//Création de la table des comptes d'utilisateurs
db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL, email TEXT NOT NULL, registration_date DATE)");


//Ajout d'un utilisateur sécurisé
const username = "johndoe";
const password = "mypassword";
const email = "johndoe@example.com";
const registration_date = "2022-01-01";
const encryptedPassword = aes256.encrypt("mySecretKey", password);

const stmt = db.prepare("INSERT INTO users (username, password, email, registration_date) VALUES (?, ?, ?, ?)");
stmt.run(username, encryptedPassword, email, registration_date);
stmt.finalize();

//Récupération des utilisateurs
db.all("SELECT * FROM users", [], (err, rows) => {
  rows.forEach((row) => {
    console.log(row.id, row.username, aes256.decrypt("mySecretKey", row.password), row.email, row.registration_date);
  });
});

db.close();