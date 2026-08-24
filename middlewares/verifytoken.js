const jwt = require("jsonwebtoken");
//VERIFY TOKEN

const verifytoken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "invalid token" });
    }
  } else {
    res.status(401).json({ message: "token not found " });
  }
};

//VERIFY TOKEN AND AUTHORIZATION

const verifyAuthAndAdmin = (req, res, next) => {
  verifytoken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "you're not allowed to do that" });
    }
  });
};

// VERIFY TOKEN AND ADMIN

const verifyAdmin = (req, res, next) => {
  verifytoken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "you're not allowed to do that" });
    }
  });
};

module.exports = { verifyAuthAndAdmin, verifyAdmin };
