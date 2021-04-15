const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize(
//   process.env.POSTGRESDB,
//   process.env.POSTGRESUSER,
//   process.env.POSTGRESPASS,
//   {
//     host: process.env.POSTGRESHOST,
//     dialect: "postgres",
//   }
// );

const sequelize = new Sequelize(
  "postgres://bhcowfyjkwipjn:d047fadc44a007294f1c277e3bf8ba451e18259c3d38dd86bf2487894b88af81@ec2-34-225-167-77.compute-1.amazonaws.com:5432/d9r4mviktd840m",
  {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
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
