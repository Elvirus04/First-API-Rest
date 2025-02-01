/* Authentification : Créer un modèle User avec Sequelize */
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: {
        msg: "Le nom est déjà pris.",
      },
    },
    password: {
      type: DataTypes.STRING,
    },
  });
};

// L'identifiant de connexion doit être unique (email, pseudo, etc.).
// Il faut encrypter les mdp (avec bcrypt par exemple).
