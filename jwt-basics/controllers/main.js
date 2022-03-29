require("dotenv").config();
const { BadRequestError } = require("../errors");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    throw new BadRequestError("Please provide email and password");

  // Normally provided by DB - just demo
  const id = new Date().getDate();
  const token = jwt.sign({ id, username }, JWT_SECRET, { expiresIn: "1d" });

  res.send({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is you authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
