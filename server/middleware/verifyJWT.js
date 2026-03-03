const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.sendStatus(401); //unauthorized

  const accessToken = authHeader.split(" ")[1];

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(401); //unauthorized
    req.username = decoded.userInfo.username;
    req.userId = decoded.userInfo.userId;
    next();
  });
};

module.exports = verifyJWT;

