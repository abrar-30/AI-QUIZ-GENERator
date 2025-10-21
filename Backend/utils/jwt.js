import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

/**
 * Generate a JWT for a given user
 * @param {Object} payload - data to include in the token (e.g., username)
 * @param {String} expiresIn - token expiry time (default 1h)
 */
export function generateToken(payload, expiresIn = "24h") {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

/**
 * Verify a JWT
 * @param {String} token - JWT string
 * @returns {Object|false} decoded payload or false if invalid
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return false;
  }
}
