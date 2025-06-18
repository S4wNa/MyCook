const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    console.log("Auth header:", authHeader); // Debug log

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "No authentication token, access denied" });
    }

    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const verified = jwt.verify(token, process.env.SECRET);
      console.log("Verified user:", verified); // Debug log
      req.user = verified;
      next();
    } catch (error) {
      console.error("Token verification error:", error); // Debug log
      return res.status(401).json({ message: "Token is not valid" });
    }
  } catch (error) {
    console.error("Auth middleware error:", error); // Debug log
    res.status(500).json({ message: "Server error in authentication" });
  }
};

module.exports = auth;
