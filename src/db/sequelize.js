const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
const UserModel = require("../models/user");
const pokemons = require("./mock-pokemon");
const bcrypt = require("bcrypt");

// ORM
const sequelize = new Sequelize("pokedex", "yourusername", "yourpassword", {
  host: "localhost",
  dialect: "postgres",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
    pokemons.map((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types,
      }).then((pokemon) => console.log(pokemon.toJSON()));
    });

    bcrypt
      .hash("pikachu", 10)
      .then((hash) => User.create({ username: "pikachu", password: hash }))
      .then((user) => console.log(user.toJSON()));

    console.log("La base de donnée a bien été initialisée !");
  });
};

//     bcrypt
//       .hash("pikachu", 10)
//       .then((hash) => {
//         // On récupère le mdp crypté.
//         User.create({
//           // On pousse un nouvel utilisateur dans notre db grâce à la méthode create.
//           username: "pikachu",
//           password: hash,
//         });
//       })
//       .then((user) => console.log(user.toJSON()));

//     console.log("La base de donnée a bien été initialisée !");
//   });
// };

module.exports = {
  initDb, // fonction permettant d'inialiser notre base de données
  Pokemon, // model sequelize
  User, // on l'expose ici pour l'utiliser ailleurs dans l'API Rest
};
