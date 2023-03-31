const express = require('express');
const session = require('express-session');
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
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true
}));

// Middleware pour vérifier si l'utilisateur est authentifié
const requireAuth = (req, res, next) => {
  if (req.session && req.session.authenticated) {
    next();
  } else {
    res.redirect('/');
  }
};

// Route pour afficher la page de connexion
app.get('/', (req, res) => {
  res.render('login');
});

// Route pour traiter la soumission du formulaire de connexion
app.post('/', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Vérifiez si l'utilisateur existe dans la base de données
  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Erreur serveur');
    } else if (row) {
      // Si l'utilisateur existe, stockez son nom dans la session
      req.session.authenticated = true;
      req.session.username = username;

      // Redirigez l'utilisateur vers la page d'informations
      res.redirect('/infos');
    } else {
      // Sinon, affichez un message d'erreur
      res.status(401).send('Nom d\'utilisateur ou mot de passe incorrect');
    }
  });
});

// Route pour afficher la page d'informations
app.get('/infos', requireAuth, (req, res) => {
  const infos = [
    { titre: 'Info 1', contenu: 'Contenu de l\'info 1' },
    { titre: 'Info 2', contenu: 'Contenu de l\'info 2' },
    { titre: 'Info 3', contenu: 'Contenu de l\'info 3' }
  ];

  const username = req.session.username;

  res.render('infos', { username: username, infos: infos });
});

app.listen(3000, () => {
  console.log('Le serveur est démarré: http://localhost:3000/');
});
