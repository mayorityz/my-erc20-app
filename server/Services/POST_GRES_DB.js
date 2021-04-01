const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("dex", "postgres", "majormayor", {
  host: "localhost",
  dialect: "postgres",
});

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
};

module.exports = { connect, sequelize };
