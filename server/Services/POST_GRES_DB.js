require("dotenv").config();
const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//   process.env.POSTGRESDB,
//   process.env.POSTGRESUSER,
//   process.env.POSTGRESPASS,
//   {
//     host: process.env.POSTGRESHOST,
//     dialect: "postgres",
//     dialectOptions: {
//       ssl: false,
//     },
//   }
// );

// const sequelize = new Sequelize(
//   "postgres://bhcowfyjkwipjn:d047fadc44a007294f1c277e3bf8ba451e18259c3d38dd86bf2487894b88af81@ec2-34-225-167-77.compute-1.amazonaws.com:5432/d9r4mviktd840m",
//   {
//     dialect: "postgres",
//     protocol: "postgres",
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
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
