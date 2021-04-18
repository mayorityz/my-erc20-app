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
  const { salesid, value, valueInEth } = req.body;
  // ! use d web3 lib to calc the valueInEth.
  try {
    //! 1. query for the record by salesid
    //! 2. reduce the sales id
    //! 3. save and add pair to seller record
    const { minPurchase, sellerid, upSale, fiat: rate } = await txModal.findOne(
      {
        _id: salesid,
      }
    );

    if (valueInEth < minPurchase) {
      res.status(200).send("Value Less Than Min. Purchase");
      return;
    }

    if (upSale < valueInEth) {
      res.status(200).send("Oooops! Someone's Beaten You To The Deal!");
      return;
    }

    //! check that pair doesn't exist...
    console.log(valueInEth);
    const query = await txModal.updateOne(
      { _id: salesid },
      {
        $inc: { upSale: -valueInEth },
        $push: {
          pairs: {
            pairId: 335,
            seller: sellerid,
            buyer: id,
            eth: valueInEth,
            fiat: value * rate,
            saleRate: rate,
            pairDate: Date.now(),
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
  // try {
  //   const fetchData = await sequelize.query(
  //     `SELECT rateatpurchase, ethvalue, fiat, orderdate, orderid, status FROM orders WHERE sellerid = ${id}`
  //   );
  //   res.status(200).json({ status: "success", data: fetchData[0] });
  // } catch (error) {
  //   res.status(400).json({ status: "failure", data: "" });
  // }
  // ! get the open orders i have as a user!!!
  try {
    const query = await txModal.findOne({
      sellerid: id,
    });
    // filter for connected!
    if (!query) {
      res
        .status(200)
        .send({ status: "success", message: "What Are you Trying To Do!?" });
      return;
    }

    let filter = query.pairs.filter((pairs) => {
      return pairs.status === "connected";
    });

    res.status(200).json({ status: "success", message: "", data: filter });
  } catch (error) {
    console.log(error);
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

  // try {
  //   const fetchData = await sequelize.query(
  //     `SELECT * FROM orders WHERE sellerid = ${id} AND orderid ='${tradeid}' AND status= 'ongoing'`
  //   );
  //   res.status(200).json({ status: "success", data: fetchData[0] });
  // } catch (error) {
  //   res.status(400).json({ status: "failure", data: [] });
  // }

  try {
    const query = await txModal.findOne({
      "pairs.pairId": parseInt(tradeid),
      "pairs.buyer": id,
      "pairs.status": "connected",
    });
    let filter;

    if (query) {
      filter = query.pairs.filter((pair) => {
        return pair.pairId === parseInt(tradeid);
      });

      res.status(200).json({
        status: "success",
        data: {
          eth: filter[0].eth,
          date: filter[0].pairDate,
          fiat: filter[0].fiat,
          rate: filter[0].saleRate,
          message: query.description,
        },
      });
      return;
    } else {
      res.status(200).json({ status: "failed", message: "Are You Lost???" });
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
