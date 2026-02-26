const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["Authorization"];

  if (!authHeader) return res.sendStatus(402);

  const accessToken = authHeader.split("")[1];

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);

    req.user = decoded.userInfo.username;

    next();
  });
};

module.exports = verifyJWT;

