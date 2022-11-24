const mongoose = require("mongoose");

const connect = mongoose.connect(
  "mongodb+srv://longviddd:Manhlong123@cluster0.yfqusml.mongodb.net/longmoney",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.on("error", (err) => console.log(err));
connection.on("connected", () => console.log("Mongo DB Connection Successful"));
