const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookie = req.cookies;

  if (!cookie?.jwt) return res.sendStatus(401); //unauthorized

  const refreshToken = cookie.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    return res.sendStatus(403); //forbidden
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign(
      { userInfo: { username: foundUser.username } },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "100s"
      }
    );

    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };

