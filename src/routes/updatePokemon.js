const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.put("/api/pokemons/:id", (req, res) => {
    const id = req.params.id;
    Pokemon.update(req.body, {
      // update = applique les modifs en base de données, mais ne retourne aucune valeur intéressante
      where: { id: id },
    }).then((_) => {
      Pokemon.findByPk(id).then((pokemon) => {
        // findByPk = méthode permettant d'aller récupérer un pokémon avec un certain id en db, et de le retourenr au client
        const message = `Le pokémon ${pokemon.name} a bien été modifié.`;
        res.json({ message, data: pokemon });
      });
    });
  });
};
