require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");

const { corsOptions } = require("./config/corsOptions");
const connectDB = require("./config/dbConn");

const cookieParser = require("cookie-parser");

const verifyJWT = require("./middleware/verifyJWT");

const PORT = process.env.PORT || 3000;

connectDB();

// console.log("Environment", process.env.NODE_ENV);

// app.use(credentials);

// console.log(corsOptions, "corsoptions");

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/register", require("./routes/register"));

app.use("/signin", require("./routes/signin"));

app.use("/refresh", require("./routes/refresh"));

app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);

app.use("/api/expenses", require("./routes/api/expenses"));

mongoose.connection.once("open", () => {
  console.log("connected to the mongoDB");
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});

