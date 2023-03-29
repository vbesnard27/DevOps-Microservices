const sqlite3 = require('sqlite3').verbose();

// Ouvrez ou créez la base de données
const db = new sqlite3.Database('your-database-file.db');

// Créez une table
const sql = `
CREATE TABLE FORMATION (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  localisation TEXT NOT NULL,
  type TEXT NOT NULL,
  niveau_sortie TEXT NOT NULL,
  langue_formation TEXT NOT NULL,
  site_web TEXT NOT NULL
);
`;

db.run(sql, function (err) {
  if (err) throw err;
  console.log("Table created");
});



// Fonction pour insérer un nouvel enregistrement
const push = (data) => {
  const sql = `
  INSERT INTO FORMATION (id, name, localisation, type, niveau_sortie, langue_formation, site_web)
  VALUES (?, ?, ?, ?, ?, ?, ?);
  `;
  const params = [data.id, data.name, data.localisation, data.type, data.niveau_sortie, data.langue_formation, data.site_web];

  db.run(sql, params, function (err) {
    if (err) throw err;
    console.log("Record inserted with id:", this.lastID);
  });
};

// Fonction pour obtenir tous les enregistrements
const get = () => {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT * FROM FORMATION;
    `;

    db.all(sql, [], (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

// Fonction pour supprimer un enregistrement
const remove = (id) => {
  const sql = `
  DELETE FROM FORMATION WHERE id = ?;
  `;

  db.run(sql, id, function (err) {
    if (err) throw err;
    console.log(`Record with id ${id} deleted.`);
  });
};


// Fonction pour mettre à jour un enregistrement
const update = (id, data) => {
  const sql = `
  UPDATE FORMATION
  SET name = ?,
      localisation = ?,
        type = ?,
        niveau_sortie = ?,
        langue_formation = ?,
        site_web = ?
    WHERE id = ?;
  `;
  const params = [data.name, data.localisation, data.type, data.niveau_sortie, data.langue_formation, data.site_web, id];

  db.run(sql, params, function (err) {
    if (err) throw err;
    console.log(`Record with id ${id} updated.`);
  });
};

// Fermez la base de données
db.close();
