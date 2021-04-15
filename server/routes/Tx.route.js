const express = require("express");
const router = express.Router();

// middleware
const userMiddleware = require("../middlewares/Users.Middleware");

// controller
const txController = require("../controllers/Tx.Controller");

router.post(
  "/transactions/save-tx",
  // userMiddleware.Validation,
  userMiddleware.VerifyCookie,
  userMiddleware.VerifyToken,
  txController.SaveTx
);

router.post(
  "/transactions/put-up-for-sale",
  // userMiddleware.Validation,
  userMiddleware.VerifyCookie,
  userMiddleware.VerifyToken,
  txController.sell
);

// -> redundant route.
router.post(
  "/transactions/save-new-tx",
  userMiddleware.VerifyCookie,
  userMiddleware.VerifyToken,
  txController.SaveNewTx
);

module.exports = router;
