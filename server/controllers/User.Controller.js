const UserModel = require("../models/Users.Models");
const UserGresModel = require("../models/postGres/users.psql");
const Hash = require("../utils/Hash");
const jwt = require("jsonwebtoken");

exports.gresUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hash = Hash.encrypt_(password);
  try {
    await UserGresModel.sync({ alter: true })
      .then(async () => {
        await UserGresModel.create({ username, email, password: hash }).then(
          (record) => {
            res.send("Account Created Successfully!!!");
          }
        );
      })
      .catch((err) => {
        console.log(err);
        let errorMessage = err.errors[0].message;
        if (errorMessage === "username must be unique") {
          res.status(200).send("UserName Already Exists!!!");
        }

        if (errorMessage === "email must be unique") {
          res.status(200).send("Email Already Exists!!!");
        }
      });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  // const hash = Hash.encrypt_(req.body.password);

  try {
    let query = await UserGresModel.findOne({
      where: { username: req.body.username },
    });
    if (query === null) {
      res.status(400).send("Invalid Credentials!!!");
    } else {
      if (Hash.checkPassWord(req.body.password, query.password)) {
        let token = jwt.sign(
          { id: query.id, email: query.email, username: query.username },
          "randomUserKeyGeneratedHere",
          {
            expiresIn: "24h",
          }
        );
        // set cookie
        res
          .status(202)
          .cookie("_user", token, {
            sameSite: "strict",
            path: "/",
            expires: new Date(new Date().getTime() + 40000 * 1000),
            httpOnly: true,
          })
          .json({ success: true, msg: token });
      } else {
        res.status(400).send("Invalid Credentials");
      }
    }
  } catch (error) {
    res.status(400).send("error : DB Error!", error.message);
  }
};

exports.newUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hash = Hash.encrypt_(password);
    const newAccount = new UserModel({
      username,
      email,
      password: hash,
    });
    const save = await newAccount.save();

    if (!save) throw "An Error Occured While Saving This Account!";
    else {
      res.status(201).json({ success: true, errors: false });
    }
  } catch (error) {
    console.log(error);
    res.status(201).json({
      success: false,
      errors: { msg: `${error}` },
    });
  }
};

exports.userLogin = async (req, res_, next) => {
  const { password, username } = req.body;
  UserModel.findOne({ username }, (err, res) => {
    if (err) {
      console.log(err);
      res_.json({ success: false, msg: err.message });
      return;
    }

    if (res !== null) {
      if (res.status === false)
        return res_.json({
          success: false,
          msg: "Account exists, but not verified!",
        });
      // sigin
      if (Hash.checkPassWord(password, res.password)) {
        let token = jwt.sign(
          { id: res._id, username },
          "randomUserKeyGeneratedHere",
          {
            expiresIn: "24h",
          }
        );
        // set cookie
        res_
          .status(202)
          .cookie("_user", token, {
            sameSite: "strict",
            path: "/",
            expires: new Date(new Date().getTime() + 40000 * 1000),
            httpOnly: true,
          })
          .json({ success: true, msg: token });

        // res_.json({ success: true, msg: token });
      } else {
        console.log("Invalid Password");
        res_.json({ success: false, msg: "Invalid Password ..." });
      }
    } else {
      console.log("invalid credentials");
      res_.json({ success: false, msg: "Invalid Credentials ..." });
    }
  });
};

exports.userProfile = async (req, res, next) => {
  const { userid } = req.params;
  UserModel.findOne({ _id: userid }, (err, res_) => {
    if (err) res.status(401).send("Database Error");
    res.json(res_);
  });
};

exports.userUpdate = async (req, res, next) => {
  const { firstName, lastName, phone1, phone2, address, LGA, state } = req.body;
  const { userid } = req.params;
  UserModel.updateOne(
    { _id: userid },
    { firstName, lastName, phone1, phone2, address, LGA, State: state },
    (err, res_) => {
      if (err) console.log(err);
      if (res_) res.json("Updated Successfully");
    }
  );
};

exports.allUsers = async (req, res, next) => {
  const query = UserModel.find({});
  const promise = query.exec();
  promise
    .then((res_) => {
      res.status(200).json(res_);
    })
    .catch((err) => {
      res.status(500).send("Error!");
    });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.body;
  UserModel.findByIdAndDelete(id)
    .then((response) => {
      console.log(response);
      res.send("Record Deleted");
    })
    .catch((err) => {
      res.send("An Error Has Occured! ", err);
    });
};

exports.verifyUser = async (req, res) => {
  const { email, uuid } = req.body;
  try {
    let update_ = await UserModel.findOneAndUpdate(
      { email, password: uuid, status: false },
      { status: true }
    );
    if (update_ === null) throw "Invalid Verification Process!";
    else res.send("ok!");
  } catch (error) {
    res.send(`${error}`);
  }
};

// exports.myDashboard = async (req, res) => {
//   const { id } = req.body;
//   /**
//     total payments
//     expected returns
//     total sales
//    */

//   //  products
//   const myProducts = await ProductModel.countMyProducts({ vendorId: id });
//   const myInvestments = await InvestmentModel.allInvestments({
//     investorId: id,
//   });
//   const myPendingOrders = await OrderModel.countMyPendingOrders({
//     customerId: id,
//     orderStatus: "InComplete",
//   });

//   res.status(201).json({
//     productCount: myProducts,
//     investmentCount: myInvestments,
//     pendingOrders: myPendingOrders,
//     totalPayments: 0,
//     expectedReturns: 0,
//     totalSales: 0,
//   });

//   // console.log(id);
// };
