require("express-async-errors");
require("dotenv").config();
const { PORT, MONGO_URI } = process.env;

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const productsRouter = require("./routes/products");

const errorMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use("/api/v1/products", productsRouter);

// products route
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(PORT, console.log(`app listening on port : ${PORT}`));
  } catch (error) {}
};

start();
