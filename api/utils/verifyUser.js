import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies?.access_token;
    console.log("Token from cookies:", token); // Debugging
  
    if (!token) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Unauthorized"
      });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.error("Token verification error:", err); // Debugging
        return res.status(403).json({
          success: false,
          statusCode: 403,
          message: "Forbidden"
        });
      }
  
      console.log("Decoded user:", user); // Debugging
      req.user = user;
      next();
    });
  };
  