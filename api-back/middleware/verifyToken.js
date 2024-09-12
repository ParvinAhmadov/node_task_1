const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(403).json({
        message: "A token is required for authentication",
      });
    }
    next();
  };
  
  module.exports = verifyToken;