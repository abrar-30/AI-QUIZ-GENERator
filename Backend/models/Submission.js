import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  qId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Question ID
  answer: { type: String, required: true },                      // User's chosen option label (e.g., "A")
  isCorrect: { type: Boolean, required: true },                  // Whether user's answer was correct
  difficulty: {                                                  // Difficulty of the question
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
});


const submissionSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  username: { type: String, required: true },
  answers: [answerSchema], // now includes isCorrect + difficulty

  score: { type: Number, required: true },
  suggestions: { type: [String], default: [] }, // AI improvement tips
  attempt: { type: Number, default: 1 },

  performance: {
    easy: { type: Number, default: 0 },    // correct answers in easy
    medium: { type: Number, default: 0 },  // correct answers in medium
    hard: { type: Number, default: 0 },    // correct answers in hard
    total: { type: Number, default: 0 },   // total correct
    accuracy: { type: Number, default: 0 } // percentage
  },

  createdAt: { type: Date, default: Date.now },
});


export default mongoose.model("Submission", submissionSchema);
