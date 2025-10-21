import mongoose from "mongoose";

// Option schema for labeled options
const optionSchema = new mongoose.Schema({
  label: { type: String, required: true }, // "A", "B", "C", "D"
  text: { type: String, required: true }   // option text
}, { _id: false });

// Question schema
const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [optionSchema], required: true }, // array of labeled options
  correctAnswer: { type: String, required: true },   // store the label of correct answer, e.g., "C"
  difficulty: { type: String, enum: ["easy", "medium", "hard"], required: true },
  hint: { type: String } // optional AI hint
});

// Quiz schema
const quizSchema = new mongoose.Schema({
  grade: { type: Number, required: true },
  subject: { type: String, required: true },
  totalQuestions: { type: Number, required: true },
  maxScore: { type: Number, required: true },
  difficulty: { type: String, enum: ["EASY","MEDIUM","HARD"], required: true },
  questions: [questionSchema],
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Quiz", quizSchema);
