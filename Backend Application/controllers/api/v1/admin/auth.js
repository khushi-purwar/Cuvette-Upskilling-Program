const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// models
const User = require("../../../../models/user");
const shortid = require("shortid");

exports.signup = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res.json({
        message: "Admin already registered!",
      });

    const { firstName, lastName, email, password } = req.body;

    const hash_password = await bcrypt.hash(password, 10);

    const _user = await User.create({
      firstName,
      lastName,
      email,
      hash_password,
      username: shortid.generate(),
      role: "admin",
    });

    return res
      .status(200)
      .json({ message: "Admin created successfully!", data: _user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


exports.signin = async (req, res) => {

  try{
  const user = await User.findOne({ email: req.body.email })
    
    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (isPassword && user.role === "admin") {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );

        const { _id, firstName, lastName, role, email, fullName } = user;
        res.cookie("token", token, { expiresIn: "1h" });
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, role, email, fullName },
          message : "Admin signin successfully!"
        });
      } else {
        return res.status(400).json({ message: "Invalid Password!" });
      }
    } else {
      return res.status(400).json({ message: "Admin does not exits!" });
    }
  }
  catch (error) {
    return res.status(400).json({ message: error.message });
  }
  }


exports.signout = (req, res) => {
  try{
  res.clearCookie("token");
  res.status(200).json({ message: "Signout successfully!" });
  }catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
