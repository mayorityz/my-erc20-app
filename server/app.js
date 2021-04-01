const express = require("express");
const cors = require("cors");
const app = express();
const DataBase = require("./Services/DATABASE");
const path = require("path");
const Port = process.env.PORT || 4444;
const userRoutes = require("./routes/Users.route");
const txRoutes = require("./routes/Tx.route");
const cookieParser = require("cookie-parser");

const verifyUserToken = require("./middlewares/Users.Middleware");

// app.use(cors());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.get("/", express.static(path.join(__dirname, "./images")));
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

// server
DataBase.then(() => {
  console.log("db is connected");
  app.listen(Port, () => {
    console.log(`running on port:${Port}`);
  });
}).catch((err) => {
  console.log(err);
});
