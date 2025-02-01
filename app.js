// Mtn on utilise + import que require, comme dans React, import ... from ...
// rôle app.js = démarrer un serveur express
const express = require("express"); // On récupère le paquet express dans notre code, en utilisant le mot clé "require" qui indique à JS d'aller chercher la dépendance express dans node_modules.
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");

const app = express(); // On crée une instance d'une app express, grâce à la méthode du même nom. Il s'agit du petit serveur web sur lequel va fonctionner l'API Rest.
const port = 3000; // On définit une simple constante nommée port, port sur lequel on va démarrer l'API Rest.

// Middleware
app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

sequelize.initDb();

// const findAllPokemons = require ("./src/routes/findAllPokemons");
// findAllPokemons(app);
require("./src/routes/findAllPokemons")(app); // raccourci de syntaxes
require("./src/routes/findPokemonByPk")(app);
require("./src/routes/createPokemon")(app);
require("./src/routes/updatePokemon")(app);
require("./src/routes/deletePokemon")(app);
require("./src/routes/login")(app);

// Ajout gestion d'erreur 404
app.use(({ res }) => {
  const message =
    "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.";
  res.status(404).json({ message });
});

// On démarre l'API Rest sur le port 3000 et on affiche un message de confirmation dans le terminal, grâce à la méthode listen.
app.listen(port, () =>
  console.log(
    `Notre application Node a démarrée sur : http://localhost:${port}`
  )
);
