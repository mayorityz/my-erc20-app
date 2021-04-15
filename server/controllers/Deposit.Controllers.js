const salesModel = require("./../models/postGres/Sale.psql");
const { sequelize } = require("./../Services/POST_GRES_DB");
const txModal = require("./../models/Tx.Model");
const txModel = require("./../models/Tx.Model");

exports.deposit = async (req, res) => {
  const { forSale, minPurchase, fiatValue, info, transid, address } = req.body;
  const { id, username } = req.who;

  let newRecord = {
    sellerid: id,
    userName: username,
    seller: address,
    valueInWei: forSale,
    transIDHash: transid,
    terms: info,
    minPurchase,
    expectedFiat: fiatValue,
  };

  try {
    await salesModel.sync({ alter: true }).then(async () => {
      await salesModel.create(newRecord).then(async (res_) => {
        await sequelize.query(
          `CALL  sp_updateSalesRecord(${id}, ${forSale}, '${address}', '${username}', '${fiatValue}', '${minPurchase}' )`
        );
        res.status(202).send("Transaction Saved To Block Chain!");
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("DB Error");
  }
};

exports.fetchAvailableSales = async (req, res) => {
  const { id } = req.who;

  try {
    const query = await txModel.find(
      { sellerid: id, upSale: { $gt: 0 } },
      { upSale: 1, minPurchase: 1, fiat: 1, _id: 1 }
    );
    if (!query) res.status(200).json({ status: "failed", response: [] });
    else res.status(200).json({ status: "success", response: query });
  } catch (error) {
    res.status(400).json({ status: "failed", response: "network failure" });
  }
};

exports.availableSales = async (req, res) => {
  const { id } = req.who;
  console.log(id);
  try {
    const response = await sequelize.query(
      `SELECT * FROM sales WHERE "userid" = ${id} AND balance > 0`
    );
    console.log(response);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.saleInfo = async (req, res) => {
  const { id } = req.who;
  const { salesid } = req.params;

  // try {
  //   const details = await sequelize.query(
  //     `SELECT userid, username, minpurchase, address, balance, rate, updated FROM sales WHERE salesid = '${salesid}' AND username = '${username}'`
  //   );
  //   res.status(200).json({ status: "success", data: details[0] });
  // } catch (error) {
  //   res.status(400).json({ status: "failure", data: "" });
  // }

  try {
    if (id) {
      const query = await txModal.findOne({ _id: salesid });
      res.status(200).send({ status: "success", data: query });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.placeorder = async (req, res) => {
  const { id } = req.who;
  const { salesid, value, fiat } = req.body;

  try {
    //! 1. query for the record by salesid
    //! 2. reduce the sales id
    //! 3. save and add pair to seller record
    const { minPurchase, sellerid, upSale, pairs } = await txModal.findOne({
      _id: salesid,
    });

    if (value < minPurchase) {
      res.status(200).send("Value Less Than Min. Purchase");
      return;
    }

    if (upSale < value) {
      res.status(200).send("Oooops! Someone's Beaten You To The Deal!");
      return;
    }

    //! check that pair doesn't exist...

    let pairBalance = value * parseInt(fiat);

    const query = await txModal.updateOne(
      { _id: salesid },
      {
        $inc: { upSale: -value },
        $push: {
          pairs: {
            seller: sellerid,
            buyer: id,
            amount: pairBalance,
            rate: fiat,
            pairdate: Date.now,
            status: "connected",
          },
        },
      }
    );

    if (query) {
      res
        .status(200)
        .json({ status: "success", message: "Order Placed Successfully" });
      return;
    } else {
      res.status(200).json({ status: "failed", message: "" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "failed", message: "" });
  }
};

exports.myOrderConnections = async (req, res) => {
  const { id } = req.who;
  try {
    const fetchData = await sequelize.query(
      `SELECT rateatpurchase, ethvalue, fiat, orderdate, orderid, status FROM orders WHERE sellerid = ${id}`
    );
    res.status(200).json({ status: "success", data: fetchData[0] });
  } catch (error) {
    res.status(400).json({ status: "failure", data: "" });
  }
};

exports.myOrders = async (req, res) => {
  const { id } = req.who;
  try {
    const fetchData = await sequelize.query(
      `SELECT rateatpurchase, ethvalue, fiat, orderdate, orderid, status FROM orders WHERE buyerid = ${id}`
    );
    res.status(200).json({ status: "success", data: fetchData[0] });
  } catch (error) {
    res.status(400).json({ status: "failure", data: "" });
  }
};

exports.buyerNegoView = async (req, res) => {
  const { id } = req.who;
  const { tradeid } = req.params;

  try {
    const fetchData = await sequelize.query(
      `SELECT * FROM orders WHERE buyerid = ${id} AND orderid ='${tradeid}' AND status= 'ongoing'`
    );
    res.status(200).json({ status: "success", data: fetchData[0] });
  } catch (error) {
    res.status(400).json({ status: "failure", data: [] });
  }
};

exports.sellerNegoView = async (req, res) => {
  const { id } = req.who;
  const { tradeid } = req.params;

  try {
    const fetchData = await sequelize.query(
      `SELECT * FROM orders WHERE sellerid = ${id} AND orderid ='${tradeid}' AND status= 'ongoing'`
    );
    res.status(200).json({ status: "success", data: fetchData[0] });
  } catch (error) {
    res.status(400).json({ status: "failure", data: [] });
  }
};
