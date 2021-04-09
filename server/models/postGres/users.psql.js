const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  process.env.POSTGRESDB,
  process.env.POSTGRESUSER,
  process.env.POSTGRESPASS,
  {
    host: process.env.POSTGRESHOST,
    dialect: "postgres",
  }
);

const User = sequelize.define(
  "Users",
  {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = User;
