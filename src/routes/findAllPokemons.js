const { Pokemon } = require("../db/sequelize");
const { Op } = require("sequelize"); // opérateurs sequelize, pour faire des requêtes plus poussées vers la db
const auth = require("../auth/auth");

// Requêtes http (client) > API Rest > appel à la base de données > envoie d'une réponse au client

module.exports = (app) => {
  app.get("/api/pokemons", auth, (req, res) => {
    if (req.query.name) {
      // indique à express qu'on souhaite extraire le paramètre de requête name de l'URL
      const name = req.query.name;
      const limit = parseInt(req.query.limit) || 5;

      if (name.length < 2) {
        const message =
          "Le terme de recherche doit contenir au moins 2 caractères.";
        return res.status(400).json({ message });
      }

      return Pokemon.findAndCountAll({
        where: {
          name: {
            // "name" est la propriété du modèle pokémon
            [Op.like]: `%${name}%`, // "name" est le critère de la recherche
          },
        },
        order: ["name"],
        limit: limit,
      }).then(({ count, rows }) => {
        const message = `Il y a ${count} pokémons qui correspondent au terme de recherche ${name}.`;
        res.json({ message, data: rows });
      });
    } else {
      Pokemon.findAll({ order: ["name"] })
        .then((pokemons) => {
          const message = "La liste des pokémons a bien été récupérée.";
          res.json({ message, data: pokemons });
        })
        .catch((error) => {
          const message =
            "La liste des pokémons n'a pas pu être récupérée. Réessayez dans quelques instants.";
          res.status(500).json({ message, date: error });
        });
    }
  });
};

// Query params
// Les paramètres d'URL pour identifier des ressources
// Les paramètres de requêtes pour trier ou filtrer des ressources

// On recherche un pokémon qui commence par le terme de recherche : ${name}%
// On recherche un pokémon qui termine par le terme de recherche : %${name}
// On recherche un pokémon qui contient par le terme de recherche : %${name}%
