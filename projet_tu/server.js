const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Création de la base de données et de la table "users" avec deux utilisateurs pré-enregistrés
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT UNIQUE NOT NULL, password TEXT NOT NULL)');
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', ['john', 'password123']);
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', ['jane', 'abc123']);
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('login');
});

app.post('/', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Vérifiez si l'utilisateur existe dans la base de données
  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Erreur serveur');
    } else if (row) {
      // Si l'utilisateur existe, affichez un message de bienvenue
      res.send(`Bienvenue, ${username}`)
        } else {
      // Sinon, affichez un message d'erreur
      res.status(401).send('Nom d\'utilisateur ou mot de passe incorrect');
    }
  });
});

app.listen(3000, () => {
  console.log('Le serveur est démarré: http://localhost:3000/');
});

