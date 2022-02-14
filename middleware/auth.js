const jwt = require("jsonwebtoken");
const { BadRequestError, UnauthorizedError } = require("../errors");
const User = require("../models/userSchema");
const Token = require("../models/token-schema");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new BadRequestError("Bad Request");
  }
  const token = authHeader.split(" ")[1];

  try {
    const isInTokens = await Token.findOne({ token: token });
    if (!isInTokens) {
      throw new UnauthorizedError("Expired Token");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, email } = decoded;
    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new UnauthorizedError("Authentification Error");
    }

    req.user = { id, email, token };
    next();
  } catch (error) {
    throw new UnauthorizedError("Authentification Error");
  }
};

const adminMiddleware = async (req, res, next) => {
  const { id: userId } = req.user;
  const user = await User.findOne({ _id: userId });
  if (!user.admin) {
    throw new UnauthorizedError("You are not an admin user");
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
