const DB = require("mongoose");

const txSchema = new DB.Schema({
  sellerid: String,
  balance: { type: Number, default: 0 },
  history: Array,
  upSale: { type: Number, default: 0 },
  saleHistory: Array,
  minPurchase: { type: Number, default: 0 },
  fiat: Number,
  description: String,
  pairs: Array,
});

const TxAction = DB.model("Transaction", txSchema);

module.exports = TxAction;
