const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  //  check is bearerHeader is undefined
  if (typeof bearerHeader !== "undefined") {
    // split at the space
    const bearer = bearerHeader.split(" ");
    // get token from the array
    const token = bearer[1];

    const user = jwt.verify(token, process.env.SECRET_KEY);
    req.user = user;

  } else {
    res.status(403).json({message : "Authorization required"});
  }

      // next middleware
      next();
      
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({ message: "User access denied" });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "Admin access denied" });
  }
  next();
};
