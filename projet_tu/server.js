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

// Création de la table "avis" pour stocker les avis des utilisateurs
db.serialize(() => {
  db.run('CREATE TABLE avis (id INTEGER PRIMARY KEY, username TEXT NOT NULL, commentaire TEXT NOT NULL)');
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

// Route pour afficher la page d'informations et les avis des utilisateurs
app.get('/infos', requireAuth, (req, res) => {
  const infos = [
    { titre: 'Info 1', contenu: 'Contenu de l\'info 1' },
    { titre: 'Info 2', contenu: 'Contenu de l\'info 2' },
    { titre: 'Info 3', contenu: 'Contenu de l\'info 3' }
  ];

  const username = req.session.username;

  // Récupérez tous les avis des utilisateurs dans la base de données
  db.all('SELECT * FROM avis', [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Erreur serveur');
    } else {
      const avis = rows;

      // Affichez la page d'informations avec les avis des utilisateurs
      res.render('infos', { username: username, infos: infos, avis: avis });
    }
  });
});

// Route pour traiter la soumission du formulaire d'avis
app.post('/avis', requireAuth, (req, res) => {
  const username = req.session.username;
  const commentaire = req.body.commentaire;
  
  // Enregistrez l'avis de l'utilisateur dans la base de données
  db.run('INSERT INTO avis (username, commentaire) VALUES (?, ?)', [username, commentaire], (err) => {
  if (err) {
  console.error(err.message);
  res.status(500).send('Erreur serveur');
  } else {
  // Redirigez l'utilisateur vers la page d'informations
  res.redirect('/infos');
  }
  });
  });
  
  // Route pour déconnecter l'utilisateur
  app.get('/logout', (req, res) => {
  // Détruisez la session de l'utilisateur
  req.session.destroy();
  // Redirigez l'utilisateur vers la page de connexion
  res.redirect('/');
  });
  
  // Lancement du serveur
  app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
  });