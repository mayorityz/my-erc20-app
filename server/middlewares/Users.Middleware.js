const { validationResult } = require("express-validator");
const UserModel = require("../models/Users.Models");
const JWT = require("jsonwebtoken");

exports.Validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).json({ errors: errors.array() });
  }
  req.email = req.body.email;
  next();
};

exports.CheckUserExists = async (req, res, next) => {
  try {
    let result = await UserModel.findOne({ email: req.email });
    result === null
      ? next()
      : res.json({
          success: false,
          errors: [{ msg: `${req.email} already exists...` }],
        });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      errors: [{ msg: `Error : ${error}` }],
    });
  }
};

// check user cookie and use value.
exports.VerifyCookie = async (req, res, next) => {
  console.log("checking cookie");
  const token = req.cookies._user;
  if (token === undefined) return res.send("User Session Expired!!!");
  next();
};

// verify jwt
exports.VerifyToken = async (req, res, next) => {
  console.log("verifying Token!");
  JWT.verify(
    req.cookies._user,
    "randomUserKeyGeneratedHere",
    (err, response) => {
      if (err) return res.status(401).send(err);
      else {
        req.who = response;
        next();
      }
    }
  );
};
