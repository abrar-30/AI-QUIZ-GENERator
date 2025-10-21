import express from "express";
import { 
  generateQuiz, 
  submitQuiz, 
  getQuizHistory, 
  retryQuiz, 
  getHint ,
  sendResultByEmail
} from "../controllers/quizController.js";
import { authenticate ,authorizeRole} from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(authenticate);

router.post("/generate",express.json(), generateQuiz);

// Submit quiz answers
router.post("/submit",express.json(), submitQuiz);

// Get quiz history with filters
router.get("/history", getQuizHistory);

// Retry a quiz
router.post("/retry",express.json(), retryQuiz);

// Get AI hint for a question
router.post("/hint",express.json(), getHint);

router.post("/send-result", express.json(), sendResultByEmail);

export default router;
