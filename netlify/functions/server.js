const express = require("express");
const serverless = require("serverless-http");
// const favicon = require("serve-favicon");
// const bodyParser = require("body-parser");
// const sequelize = require("../../src/db/sequelize");

const app = express();
// app.use(favicon(__dirname + "/favicon.ico")).use(bodyParser.json());

// sequelize.initDb();

app.get("/", (req, res) => {
  res.json("Hello, Netlify!");
});

// require("../../src/routes/findAllPokemons")(app);
// require("../../src/routes/findPokemonByPk")(app);
// require("../../src/routes/createPokemon")(app);
// require("../../src/routes/updatePokemon")(app);
// require("../../src/routes/deletePokemon")(app);
// require("../../src/routes/login")(app);

app.use(({ res }) => {
  res.status(404).json({
    message: "Impossible de trouver la ressource demandée !",
  });
});

module.exports.handler = serverless(app);
