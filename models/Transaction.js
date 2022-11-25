const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  reference: { type: String },
  description: { type: String },
  date: { type: Date, required: true },
});
const transactionmodel = mongoose.model("Transactions", transactionSchema);
module.exports = transactionmodel;
