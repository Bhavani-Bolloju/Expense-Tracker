require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");

connectDB();

const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));

app.use(express.json());

app.use("/register", require("./routers/register"));

app.use("/signin", require("./routers/signin"));

mongoose.connection.once("open", () => {
  console.log("connected to the mongoDB");
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});

