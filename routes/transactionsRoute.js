const express = require("express");
const Transaction = require("../models/Transaction");
const router = express.Router();

router.post("/add", async function (req, res) {
  try {
    console.log("running");
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.send("Transaction Added Succesfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.get("/all", async function (req, res) {
  try {
    const allTransactions = await Transaction.find({
      userId: req.query["userId"],
    });
    console.log(req.body.userId);
    res.send(allTransactions);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
