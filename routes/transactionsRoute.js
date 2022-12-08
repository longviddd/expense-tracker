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
    res.status(500).json(error);
  }
});
router.delete("/delete", async function (req, res) {
  try {
    await Transaction.findOneAndDelete({ _id: req.body._id });
    res.send("Transaction deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});
router.put("/edit", async function (req, res) {
  try {
    await Transaction.findOneAndUpdate({ _id: req.body._id }, req.body);
    res.send("Transaction updated successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/all", async function (req, res) {
  const frequency = req.query["frequency"];
  const selectedRange = req.query["selectedRange"];
  const type = req.query["type"];
  try {
    const allTransactions = await Transaction.find({
      userId: req.query["userId"],
      ...(type !== "all" && {
        type: type,
      }),
      ...(frequency !== "custom" &&
        frequency !== "all" && {
          date: {
            $gt: moment()
              .subtract(Number(req.query["frequency"]), "d")
              .toDate(),
          },
        }),
      ...(frequency === "custom" && {
        date: {
          $gte: selectedRange[0],
          $lte: selectedRange[1],
        },
      }),
      ...(frequency === "all" && {}),
    });
    res.send(allTransactions);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
