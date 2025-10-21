import { verifyToken } from "../utils/jwt.js";

export function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "❌ Token missing" });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(403).json({ message: "❌ Invalid or expired token" });
  }

  req.user = decoded; // attach user info (e.g., username) to request
  next();
}

export function authorizeRole() {
  return (req, res, next) => {
    console.log(req.user.role)
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "❌ Access denied" });
    }
    next();
  };
}