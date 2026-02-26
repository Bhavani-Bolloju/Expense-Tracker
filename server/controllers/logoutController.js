const User = require("../model/User");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(204).json({ error: "no content" });

  const refreshToken = cookies?.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // false in dev, true in prod
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax" // 'Lax' in dev, 'None' in prod
    });

    return res.status(200).json({ message: "no use found, logging off" });
  }

  foundUser.refreshToken = "";
  await foundUser.save();

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // false in dev, true in prod
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax" // 'Lax' in dev, 'None' in prod
  });

  res.status(200).json({ message: "logged out successfully" });
};

module.exports = { handleLogout };

