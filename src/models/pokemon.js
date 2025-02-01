const validTypes = [
  "Plante",
  "Poison",
  "Feu",
  "Eau",
  "Insecte",
  "Vol",
  "Normal",
  "Electrik",
  "Fée",
];

module.exports = (sequelize, DataTypes) => {
  // Export d'une fonction qui prend 2 paramètres. sequelize = objet qui représente la connexion à notre base de donnée pour sequelize (propriété define qui permet de déclarer un nouveau model à sequelize). DataTypes = permet de définir les types de donnée de chaque propriété de notre modèle.
  return sequelize.define(
    "Pokemon", // On déclarer le model Pokemon.
    {
      // Description du model.
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Le nom est déjà pris.",
        },
        validate: {
          notEmpty: { msg: "Le nom ne peut pas être vide." },
          notNull: { msg: "Le nom du pokémon est requis." },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement des nombres entiers pour les points de vie.",
          },
          notNull: {
            msg: "Les points de vie sont une propriété requise.",
          },
          max: {
            args: [999],
            msg: "Les points de vie doivent être inférieurs ou égales à 999.",
          },
          min: {
            args: [0],
            msg: "Les points de vie doivent être supérieurs ou égales à 0.",
          },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement des nombres entiers pour les points de dégâts.",
          },
          notNull: {
            msg: "Les points de dégâts sont une propriété requise.",
          },
          max: {
            args: [99],
            msg: "Les points de dégâts doivent être inférieurs ou égales à 99.",
          },
          min: {
            args: [0],
            msg: "Les points de dégâts doivent être supérieurs ou égales à 0.",
          },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: "L'URL de l'image n'est pas valide." },
          notNull: { msg: "Une image est requise." },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          // Getter : Base de données > API Rest
          return this.getDataValue("types").split(","); // ["Plante", "Poison"]
        },
        set(types) {
          // Setter : API Rest > Base de données
          this.setDataValue("types", types.join()); // "Plante, Poison"
        },
        validate: {
          isTypesValid(value) {
            // définition d'une fonction qui n'est pas un validator native de sequelize, mais d'un nom arbitraire que nous donnons à ce validator personalisé
            if (!value) {
              throw new Error("Un pokémon doit avoir au moins un type.");
            }
            if (value.split(",").length > 3) {
              throw new Error(
                "Un pokémon ne peux pas avoir plus de trois types."
              );
            }
            value.split(",").forEach((type) => {
              if (!validTypes.includes(type)) {
                throw new Error(
                  `Le type d'un pokémon doit appartenir à la liste suivante : ${validTypes}.`
                );
              }
            });
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
