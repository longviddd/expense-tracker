const express = require("express");
const dbConnect = require("./dbConnect");
const app = express();
app.use(express.json());
const port = 5000;
const userRoute = require("./routes/usersRoute");
const transactionRoute = require("./routes/transactionsRoute");

app.use("/api/users/", userRoute);
app.use("/api/transactions/", transactionRoute);
app.listen(port, () => console.log(`Node JS server started at port ${port}!`));
