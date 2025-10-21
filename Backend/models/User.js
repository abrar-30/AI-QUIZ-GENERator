import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed if real auth
  role: { type: String, enum: ["user", "teacher"], default: "user" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
