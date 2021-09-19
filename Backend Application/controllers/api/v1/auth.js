const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

// models
const User = require("../../../models/user");

//  creating a user
exports.signup = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res.json({
        message: "Customer already registered!",
      });

    const { firstName, lastName, email, password } = req.body;

    const hash_password = await bcrypt.hash(password, 10);

    const _user = await User.create({
      firstName,
      lastName,
      email,
      hash_password,
      username: shortid.generate(),
    });
    return res
      .status(200)
      .json({ message: "Customer created successfully!", data: _user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// signing user
exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (isPassword) {
        // creating token
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );

        const { _id, firstName, lastName, role, email, fullName } = user;
        res.cookie("token", token, { expiresIn: "1h" });

        res
          .status(200)
          .json({
            token,
            user: { _id, firstName, lastName, role, email, fullName },
            message: "Customer signin succesfully!",
          });
      } else {
        return res.status(400).json({ message: "Invalid Password!" });
      }
    } else {
      return res.status(400).json({ message: "Customer does not exits!" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// signout user
exports.signout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Signout successfully!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
