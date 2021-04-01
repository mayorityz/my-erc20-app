const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
// middleware
const userMiddleware = require("../middlewares/Users.Middleware");
// controller
const userController = require("../controllers/User.Controller");

router.post(
  "/newuser",
  [
    body("username").trim().not().isEmpty(),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Invalid Email Address Supplied"),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password Cannot be less than five characters."),
  ],
  userMiddleware.Validation,
  userMiddleware.CheckUserExists,
  userController.newUser
);
router.post("/login", userController.userLogin);
router.post("/person", userController.gresUser);
router.post("/userlogin", userController.login);
// router.get("/allusers", userController.allUsers);
// router.get("/profile/:userid", userController.userProfile);
// router.post("/updateprofile/:userid", userController.userUpdate);
// router.post("/user/delete", userController.deleteUser);
// router.post("/verify-my-account", userController.verifyUser);
// router.post("/user/dashboard", userController.myDashboard);
module.exports = router;
