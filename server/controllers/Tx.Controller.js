const txModel = require("./../models/Tx.Model");
const txGresModel = require("./../models/postGres/deposit.psql");

exports.SaveTx = async (req, res) => {
  //! check that the user exists in the table insert else update
  const { transactionHash, from, value } = req.body;
  let data = {
    sellerid: req.who.id,
    balance: value,
    history: [
      {
        date: Date.now(),
        address: from,
        amount: value,
        hash: transactionHash,
      },
    ],
  };
  // const newTx = new txModel(data);
  // const saveTx = await newTx.save();

  const saveTx = await txModel.updateOne(
    { sellerid: req.who.id },
    { $inc: { balance: value }, $push: { history: data.history } },
    { upsert: true }
  );

  if (!saveTx)
    res.status(202).send("An Error Occured While Saving This Record!!!");
  else {
    res.status(201).send(`Deposit ${transactionHash} was successfully Made!`);
  }
};

exports.sell = async (req, res) => {
  const { forSale, minPurchase, fiatValue, info, transid, address } = req.body;
  const updateRecord = await txModel.updateOne(
    { sellerid: req.who.id },
    {
      $inc: { balance: -forSale, upSale: forSale },
      minPurchase,
      fiat: fiatValue,
      description: info,
      $push: {
        saleHistory: {
          txid: transid,
          address,
          amount: forSale,
          date: Date.now,
        },
      },
    }
    // {
    //   upsert: true,
    // }
  );

  if (!updateRecord) res.status(202).json({ status: "Failed", data: null });
  else
    res
      .status(201)
      .json({ status: "success", data: "Value Saved SuccessFully!" });
};

exports.SaveNewTx = async (req, res) => {
  const { transactionHash, blockHash, from, value } = req.body;
  let data = {
    valueInWei: value,
    txHash: transactionHash,
    sellerid: req.who.id,
    sellerAddress: from,
    blockHash,
  };

  try {
    await txGresModel.sync({ alter: true }).then(async () => {
      await txGresModel.create(data).then((res_) => {
        console.log(res_);
        res.send("Transaction Saved To Block Chain!");
      });
    });
  } catch (error) {
    console.log(error);
  }
};
