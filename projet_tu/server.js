const express = require('express');
const app = express();

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
  console.log('Le serveur est démarré sur le port 3000');
});
