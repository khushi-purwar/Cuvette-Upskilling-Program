const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  try {
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
  } catch (error) {
    res.status(400).json({message : error});
  }
      
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "consumer") {
    return res.status(400).json({ message: "Consumer access denied" });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "Admin access denied" });
  }
  next();
};


