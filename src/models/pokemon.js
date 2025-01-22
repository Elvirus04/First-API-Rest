/* L’API Rest et la Base de données : Créer un modèle Sequelize */
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
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
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
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
