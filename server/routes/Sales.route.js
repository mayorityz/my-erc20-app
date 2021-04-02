const express = require("express");
const router = express.Router();

// middleware
const userMiddleware = require("../middlewares/Users.Middleware");

// controller
const salesController = require("./../controllers/Deposit.Controllers");

router.post(
  "/sales/newsalesdeposit",
  userMiddleware.VerifyCookie,
  userMiddleware.VerifyToken,
  salesController.deposit
);

router.get(
  "/sales/get-available-sales",
  userMiddleware.VerifyCookie,
  userMiddleware.VerifyToken,
  salesController.availableSales
);

router.get(
  "/sales/details/:salesid",
  userMiddleware.VerifyCookie,
  userMiddleware.VerifyToken,
  salesController.saleInfo
);

router.post(
  "/sales/placeorder",
  userMiddleware.VerifyCookie,
  userMiddleware.VerifyToken,
  salesController.placeorder
);

router.get(
  "/sales/orderhistory",
  userMiddleware.VerifyCookie,
  userMiddleware.VerifyToken,
  salesController.myOrderConnections
);
module.exports = router;
