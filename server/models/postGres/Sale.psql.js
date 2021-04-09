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

const Sale = sequelize.define(
  "ForSale",
  {
    // Model attributes are defined here
    sellerid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seller: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valueInWei: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    transIDHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    terms: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    minPurchase: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    expectedFiat: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Sale;
