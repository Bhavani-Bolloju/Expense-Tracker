const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookie = req.cookies;

  if (!cookie?.jwt) return res.sendStatus(401); //unauthorized

  const refreshToken = cookie.jwt;

  // console.log(refreshToken, "refresh token");

  const foundUser = await User.findOne({ refreshToken }).exec();

  // console.log(foundUser, "found user ");

  if (!foundUser) {
    return res.sendStatus(403); //forbidden
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.userInfo.username) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign(
      { userInfo: { username: foundUser.username } },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "3600s"
      }
    );

    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };

/*eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJ1c2VybmFtZSI6InVzaGEgc2hyZWUiLCJ1c2VySWQiOiI2OTljMDY3NmNkZmVhZTcyYTM0ODRjOGIifSwiaWF0IjoxNzcyMzY5MDE2LCJleHAiOjE3NzIzNjkwNDZ9.5ag1SQdYIUKx96_yM2NrWlhuyUsaXJgnb2MmWCHjidU 

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJ1c2VybmFtZSI6InVzaGEgc2hyZWUifSwiaWF0IjoxNzcyMzY5MDY4LCJleHAiOjE3NzIzNjkxNjh9.LpLzDCEisiqPcxn-gj3MBBfyhJKTW6M9gk-V0hVF-xk

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJ1c2VybmFtZSI6InVzaGEgc2hyZWUifSwiaWF0IjoxNzcyMzY5MTcyLCJleHAiOjE3NzIzNjkyNzJ9.Kuv9QFq8c5oAtdEWYdX2Xvc6FfwUyWuwyZn005G0z_M



*/

