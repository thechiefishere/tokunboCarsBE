require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const morgan = require("morgan");
const carsRoute = require("./routes/carsRoute");
const authRoute = require("./routes/authRoute");
const connect = require("./db/connect");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

app.use(express.json());
app.use(morgan("dev"));

// app.use("/", (req, res) => {
//   res.send("Buy Tokunbo Cars");
// });

//security
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

app.use("/cars", carsRoute);
app.use("/authenticate", authRoute);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3003;
const start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(port, console.log("Server Listening on port ", port));
  } catch (error) {
    console.log(error);
  }
};

start();
