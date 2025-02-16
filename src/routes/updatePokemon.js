const { Pokemon } = require("../db/sequelize");
const { ValidationError, UniqueConstraintError } = require("sequelize");
const auth = require("../auth/auth");

module.exports = (app) => {
  app.put("/api/pokemons/:id", auth, (req, res) => {
    const id = req.params.id;
    Pokemon.update(req.body, {
      // update = applique les modifs en base de données, mais ne retourne aucune valeur intéressante
      where: { id: id },
    })
      .then((_) => {
        return Pokemon.findByPk(id) // findByPk = méthode permettant d'aller récupérer un pokémon avec un certain id en db, et de le retourenr au client
          .then((pokemon) => {
            if (pokemon === null) {
              const message =
                "Le pokémon demandé n'existe pas. Réessayer avec un autre identifiant.";
              return res.status(404).json({ message });
            }
            const message = `Le pokémon ${pokemon.name} a bien été modifié.`;
            res.json({ message, data: pokemon });
          });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, date: error });
        }
        const message =
          "La liste des pokémons n'a pas pu être modifié. Réessayez dans quelques instants.";
        res.status(500).json({ message, date: error });
      });
  });
};
