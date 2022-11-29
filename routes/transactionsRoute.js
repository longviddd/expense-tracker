const express = require("express");
const Transaction = require("../models/Transaction");
const router = express.Router();
const moment = require("moment");

router.post("/add", async function (req, res) {
  try {
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    res.send("Transaction Added Succesfully");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.get("/all", async function (req, res) {
  const frequency = req.query["frequency"];
  const selectedRange = req.query["selectedRange"];
  try {
    const allTransactions = await Transaction.find({
      userId: req.query["userId"],
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment()
                .subtract(Number(req.query["frequency"]), "d")
                .toDate(),
            },
          }
        : {
            date: {
              $gte: selectedRange[0],
              $lte: selectedRange[1],
            },
          }),
    });
    console.log(req.query["frequency"]);

    res.send(allTransactions);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
