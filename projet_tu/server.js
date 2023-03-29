const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('mydatabase.db');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('login');
});

app.post('/', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // Vérifiez ici si l'utilisateur est authentifié
  res.send(`Bienvenue, ${username} !`);
});

app.listen(3000, () => {
  console.log('Le serveur est démarré: http://localhost:3000/');
});



db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)');
db.run('INSERT INTO users (username, password) VALUES (?, ?)', ['john', 'password123']);
db.run('INSERT INTO users (username, password) VALUES (?, ?)', ['jane', 'abc123']);

db.all('SELECT * FROM users', [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach(row => {
    console.log(row.username, row.password);
  });
});
db.close()