const txModel = require("./../models/Tx.Model");
const txGresModel = require("./../models/postGres/deposit.psql");

exports.SaveTx = async (req, res) => {
  const { transactionHash, blockHash, from, value } = req.body;
  let data = {
    valueInWei: value,
    txHash: transactionHash,
    sellerid: req.who.id,
    sellerAddress: from,
    blockHash,
  };
  const newTx = new txModel(data);
  const saveTx = await newTx.save();

  if (!saveTx) throw "An Error Occured While Saving This Account!";
  else {
    res.status(201).send(`Deposit ${transactionHash} was successfully Made!`);
  }
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
