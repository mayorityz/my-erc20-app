require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.POSTGRESDB,
  process.env.POSTGRESUSER,
  process.env.POSTGRESPASS,
  {
    host: process.env.POSTGRESHOST,
    dialect: "postgres",
  }
);

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    require("./../app2");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
};

connect();

module.exports = { connect, sequelize };
