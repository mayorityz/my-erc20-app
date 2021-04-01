const salesModel = require("./../models/postGres/Sale.psql");
const { sequelize } = require("./../Services/POST_GRES_DB");

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

exports.availableSales = async (req, res) => {
  const { id } = req.who;
  console.log(id);
  try {
    const response = await sequelize.query(
      `SELECT * FROM sales WHERE "userid" = ${id}`
    );
    console.log(response);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.saleInfo = async (req, res) => {
  const { id, username } = req.who;
  const { salesid } = req.params;

  try {
    const details = await sequelize.query(
      `SELECT userid, username, minpurchase, address, balance, rate, updated FROM sales WHERE salesid = '${salesid}' AND username = '${username}'`
    );
    res.status(200).json({ status: "success", data: details[0] });
  } catch (error) {
    res.status(400).json({ status: "failure", data: "" });
  }
};

exports.placeorder = async (req, res) => {
  const { id, username } = req.who;
  const { fiat, value, sellerid, rates, salesid } = req.body;

  try {
    const details = await sequelize.query(
      `CALL sp_update_sales_record_on_order(${value}, '${salesid}', ${fiat}, ${id}, ${sellerid}, ${rates}) `
    );
    console.log(details);
    res.status(200).json({ status: "success", data: details[0] });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "failure", data: "" });
  }
};
