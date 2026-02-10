const User = require("../model/User");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const authHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const foundUser = await User.findOne({ email });

  console.log(foundUser, "found user");

  if (!foundUser) {
    return res.status(401).json({ error: `No user exist` });
  }

  //verify password
  const validPassword = await bcrypt.compare(password, foundUser.password);

  if (!validPassword) {
    return res.status(401).json({ error: "invalid password" });
  }

  try {
    const accessToken = jwt.sign(
      { userInfo: { username: foundUser.username } },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "100s"
      }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d"
      }
    );

    //add refresh token to the user DB
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    res.cookie("jwt", refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "None"
    });

    return res.json({
      accessToken,
      user: {
        id: foundUser._id,
        email: foundUser.email,
        username: foundUser.username
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { authHandler };

