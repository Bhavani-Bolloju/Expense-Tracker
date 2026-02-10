const User = require("../model/User");

const bcrypt = require("bcrypt");

const handleRegister = async function (req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res
      .status(400)
      .json({ message: "username and login credentials are required" });
  }

  //duplicate username in DB
  const duplicateUsername = await User.findOne({ username });
  if (duplicateUsername) {
    return res.status(409).json({ error: `${username} already exists` });
  }

  //duplicate email address in DB
  const duplicateEmail = await User.findOne({ email });
  if (duplicateEmail) {
    return res.status(409).json({ error: `${email} already exists` });
  }

  try {
    //hash password
    const hashedPwd = await bcrypt.hash(password, 10);
    //add to the DB
    const user = await User.create({ username, email, password: hashedPwd });

    console.log(user, "new user created and add to mongoDB");

    //send back the res
    return res.status(201).json({ success: `${username} account is created` });
  } catch (error) {
    // const hash_pwd = await bcrypt.hash(password, 10);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { handleRegister };

