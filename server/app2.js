const express = require("express");
const cors = require("cors");

const { Sequelize } = require("sequelize");

const Port = process.env.PORT || 4444;
const userRoutes = require("./routes/Users.route");
const txRoutes = require("./routes/Tx.route");
const salesRoutes = require("./routes/Sales.route");

const cookieParser = require("cookie-parser");
const verifyUserToken = require("./middlewares/Users.Middleware");

const app = express();

// app.use(cors());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(userRoutes);
app.use(txRoutes);
app.use(salesRoutes);

app.get("/tes", (req, res) => {
  console.log(req.cookies);
  res.send("here we are!!!");
});
// this will serve as a middleware ...
// check that the cookie isn't expired.
app.get(
  "/cook",
  verifyUserToken.VerifyCookie,
  verifyUserToken.VerifyToken,
  (req, res) => {
    console.log(req.cookies._user);
    console.log(req.who);
    res.send("get cookie");
  }
);
// catch undefined routes and respond with 404
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

// catch server errors and respond with 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const sequelize = new Sequelize("dex", "postgres", "majormayor", {
  host: "localhost",
  dialect: "postgres",
});

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    app.listen(Port, () => {
      console.log(`connected successfully & running on port:${Port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
};

connect();
