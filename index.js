const express = require("express");
const cli = require("cli-color");
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./routes/User");
const boardsRouter = require("./routes/Boards");
const listRouter = require("./routes/List");
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.json());
app.use(express.urlencoded( { extended: false } ));


mongoose.connect("mongodb://127.0.0.1:27017/todollo").then(() => {
    console.log(cli.green.bold(`MongoDB connected`));
}).catch((err) => console.log(cli.red.bold("Mongo error", err)));

app.use(session({
    name: "session.id",
    secret: "hello world",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/todollo" })
}));

app.use("/user", userRouter);
app.use("/board", boardsRouter);
app.use("/list", listRouter);

app.listen(PORT, () => {
    console.log(cli.green.bold(`The server is running on ${PORT}`));
})

// TODO
// User schema - Done
// Authentication - done
// Board schema - 
// Lists schema
// Cards schema