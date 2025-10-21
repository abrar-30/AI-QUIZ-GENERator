import { generateToken } from "../utils/jwt.js";

/**
 * Mock login controller
 * Accepts any username/password and returns JWT
 */
export function login(req, res) {
  const { username, password,role} = req.body;

  if (!username || !password ) {
    return res.status(400).json({ message: "Username & password required" });
  }
  console.log(role);
  // Generate JWT with username
  const token = generateToken({ username ,role});

  res.json({
    message: "✅ Login successful",
    token,
  });
}
