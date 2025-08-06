const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET || "dummy-secret";

const getToken = (id) => {
  const token = jwt.sign({ _id: id }, secret, {
    expiresIn: "7d"
  });

  return token;
};

const ensureAuth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).send({
      success: false,
      msg: "Authorization header missing!"
    });
  }

  const rilToken = token.split(" ")[1];

  try {
    const decoded = jwt.verify(rilToken, secret);
    req._id = decoded._id;

    next();
  } catch (err) {
    res.status(401).send({
      success: false,
      msg: "Invalid jwt token!"
    });
  }
};

module.exports = { ensureAuth, getToken };
