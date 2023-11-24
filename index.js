const express = require("express");
const cli = require("cli-color");
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./routes/User")

const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

app.use("/api/user", userRouter);

mongoose.connect("mongodb://127.0.0.1:27017/todollo").then(() => {
    console.log(cli.green.bold(`MongoDB connected`));
}).catch((err) => console.log(cli.red.bold("Mongo error", err)));


app.listen(PORT, () => {
    console.log(cli.green.bold(`The server is running on ${PORT}`));
})