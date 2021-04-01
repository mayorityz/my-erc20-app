const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("dex", "postgres", "majormayor", {
  host: "localhost",
  dialect: "postgres",
});

const Deposit = sequelize.define(
  "Deposits",
  {
    // Model attributes are defined here
    sellerid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sellerAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    txHash: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    valueInWei: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    blockHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Deposit;
