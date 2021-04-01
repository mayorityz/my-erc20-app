const DB = require("mongoose");

const txSchema = new DB.Schema({
  sellerid: String,
  sellerAddress: String,
  txHash: String,
  valueInWei: Number,
  date: { type: Date, default: Date.now() },
  blockHash: String,
  status: { type: Boolean, default: true },
});

const TxAction = DB.model("Transaction", txSchema);

module.exports = TxAction;
