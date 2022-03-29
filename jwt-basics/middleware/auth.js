require("dotenv").config();
const { UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const authenticationMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer "))
    throw new UnauthenticatedError("Something went wrong");

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (err) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
};

module.exports = authenticationMiddleware;
