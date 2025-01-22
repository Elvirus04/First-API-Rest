const { Pokemon } = require("../db/sequelize");

// Requêtes http (client) > API Rest > appel à la base de données > envoie d'une réponse au client

module.exports = (app) => {
  app.get("/api/pokemons", (req, res) => {
    Pokemon.findAll().then((pokemons) => {
      const message = "La liste des pokémons a bien été récupérée.";
      res.json({ message, data: pokemons });
    });
  });
};
