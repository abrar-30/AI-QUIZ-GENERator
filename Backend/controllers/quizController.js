import Quiz from "../models/Quiz.js";
import Submission from "../models/Submission.js";
import { evaluateQuizAI, generateAIHint, generateAIQuiz } from "../services/aiService.js";
import { sendEmail } from "../utils/email.js";


/**
 * Generate a new quiz (AI-powered)
 * Request body: { grade, subject, totalQuestions, maxScore, difficulty }
 */
function calculateDifficultySplit(totalQuestions, avgScore, maxScore) {
  let easy = 0, medium = 0, hard = 0;

  
    const ratio = avgScore / maxScore;
    if (ratio <= 0.4) {
      easy = Math.ceil(totalQuestions * 0.5);
      medium = Math.ceil(totalQuestions * 0.4);
      hard = totalQuestions - easy - medium;
    } else if (ratio <= 0.7) {
      easy = Math.ceil(totalQuestions * 0.3);
      medium = Math.ceil(totalQuestions * 0.5);
      hard = totalQuestions - easy - medium;
    } else {
      easy = Math.ceil(totalQuestions * 0.1);
      medium = Math.ceil(totalQuestions * 0.4);
      hard = totalQuestions - easy - medium;
    }
  

  return { easy, medium, hard };
}

/**
 * Generate a new quiz (AI-powered + adaptive difficulty)
 */
export async function generateQuiz(req, res) {
  try {
    const { grade, subject, totalQuestions, maxScore, difficulty } = req.body;
    const username = req.user.username;

    if (!grade || !subject || !totalQuestions || !maxScore || !difficulty) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔹 Step 1: Fetch past submissions for this user + subject + grade
    const pastSubmissions = await Submission.find({ username })
      .populate("quizId", "grade subject totalQuestions maxScore")
      .lean();

    const relevantSubs = pastSubmissions.filter(
      s => s.quizId && s.quizId.grade === grade && s.quizId.subject === subject
    );

    // 🔹 Step 2: Compute average score
    const avgScore = relevantSubs.length
      ? relevantSubs.reduce((acc, s) => acc + s.score, 0) / relevantSubs.length
      : null;

    // 🔹 Step 3: Determine difficulty split
    const { easy, medium, hard } = calculateDifficultySplit(totalQuestions, avgScore, maxScore);

    // 🔹 Step 4: Generate AI questions
    let rawQuestions = [];
    if (avgScore !== null) {
      rawQuestions = [
        ...(easy > 0 ? await generateAIQuiz(grade, subject, easy, "easy") : []),
        ...(medium > 0 ? await generateAIQuiz(grade, subject, medium, "medium") : []),
        ...(hard > 0 ? await generateAIQuiz(grade, subject, hard, "hard") : []),
      ];
    } else {
      rawQuestions = await generateAIQuiz(grade, subject, totalQuestions, difficulty.toLowerCase());
    }

    if (!rawQuestions || rawQuestions.length === 0) {
      return res.status(500).json({ message: "AI failed to generate questions" });
    }

    // 🔹 Step 5: Transform questions with labeled options
    const questions = rawQuestions.map(q => {
      const opts = [...q.options].slice(0, 4);
      while (opts.length < 4) opts.push("Option " + (opts.length + 1));

      const labeledOptions = ["A", "B", "C", "D"].map((label, i) => ({
        label,
        text: opts[i],
      }));

      const correctOption = labeledOptions.find(opt => opt.text === q.correctAnswer)?.label || "A";

      return {
        question: q.question,
        options: labeledOptions,
        correctAnswer: correctOption,
        difficulty: q.difficulty,
        hint: q.hint || "",
      };
    });

    // 🔹 Step 6: Save quiz to DB
    const quiz = await Quiz.create({
      grade,
      subject,
      totalQuestions,
      maxScore,
      difficulty,
      questions,
      createdBy: username,
    });

    // 🔹 Step 7: Respond
    return res.json({
      quizId: quiz._id,
      grade: quiz.grade,
      subject: quiz.subject,
      totalQuestions: quiz.totalQuestions,
      maxScore: quiz.maxScore,
      difficulty: quiz.difficulty,
      questions: quiz.questions,
      adaptive: avgScore !== null,
      avgScore: avgScore !== null ? avgScore : undefined,
    });

  } catch (err) {
    console.error("❌ Error generating quiz:", err);
    res.status(500).json({ message: "Server error" });
  }
}

/**
 * Submit quiz answers
 * Request body:
 * {
 *   "quizId": "randomQuizId",
 *   "responses": [
 *     { "questionId": "q1", "userResponse": "A" },
 *     { "questionId": "q2", "userResponse": "D" }
 *   ]
 * }
 */

export async function submitQuiz(req, res) {
  try {
    const { quizId, responses } = req.body;
    const username = req.user.username;

    if (!quizId || !responses || !Array.isArray(responses)) {
      return res.status(400).json({ message: "quizId and responses are required" });
    }

    const quiz = await Quiz.findById(quizId);
  if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // Map responses into {qId, answer}
    const answers = responses.map(r => ({
      qId: r.questionId,
      answer: r.userResponse,
    }));

    // Evaluate with AI (returns score, suggestions, enriched answers, performance)
    const { score, suggestions, answers: enrichedAnswers, performance } = await evaluateQuizAI(quiz, answers);

    // 🔥 Find last attempt number and increment
    const lastSubmission = await Submission.findOne({ quizId, username })
      .sort({ attempt: -1 })
      .lean();

    const attempt = lastSubmission ? lastSubmission.attempt + 1 : 1;

    // Save submission
    const submission = await Submission.create({
      quizId,
      username,
      answers: enrichedAnswers, // store enriched answers with correctness & difficulty
      score,
      suggestions,
      attempt,
    });

    // Fetch all previous submissions for this user & quiz
    const previousSubmissions = await Submission.find({ quizId, username })
      .sort({ createdAt: -1 })
      .select("score attempt createdAt suggestions");

    return res.json({
      submissionId: submission._id,
      quizId,
      username,
      score,
      attempt,
      suggestions,
      previousSubmissions,
      performance, // send performance summary to frontend
      message: "Submission saved successfully with AI-generated suggestions",
    });
  } catch (err) {
    console.error("❌ Error submitting quiz:", err);
    res.status(500).json({ message: "Server error" });
  }
}


/**
 * Get quiz history for the authenticated user.
 * Supports optional filters: grade, subject, minScore, maxScore, minAttempt, maxAttempt, from, to
 * Pagination: p (page, default 1), limit (page size, default 10)
 * Response shape: { page, pageLimit, total, totalPages, data: [ { submissionId, quizId, grade, subject, totalQuestions, maxScore, score, attempt, submittedAt, suggestions } ] }
 */
export async function getQuizHistory(req, res) {
  try {
    const username = req.user.username; // fetched from auth middleware
    const {
      grade,
      subject,
      minScore,
      maxScore,
      minAttempt,
      maxAttempt,
      p = '1',
      limit = '10',
      from,
      to
    } = req.query;

    // Pagination
    const page = Math.max(1, parseInt(p, 10) || 1);
    const pageLimit = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (page - 1) * pageLimit;

    // Build base match for Submission fields
    const match = { username };
    if (minScore || maxScore) {
      match.score = {};
      if (minScore) match.score.$gte = Number(minScore);
      if (maxScore) match.score.$lte = Number(maxScore);
    }
    if (minAttempt || maxAttempt) {
      match.attempt = {};
      if (minAttempt) match.attempt.$gte = Number(minAttempt);
      if (maxAttempt) match.attempt.$lte = Number(maxAttempt);
    }
    if (from || to) {
      match.createdAt = {};
      if (from) match.createdAt.$gte = new Date(from);
      if (to) match.createdAt.$lte = new Date(to);
    }

    // Use aggregation to join quiz data and support pagination + metadata in one roundtrip
    const quizColl = Quiz.collection.name; // safe collection name

    const pipeline = [
      { $match: match },
      {
        $lookup: {
          from: quizColl,
          localField: 'quizId',
          foreignField: '_id',
          as: 'quiz'
        }
      },
      { $unwind: { path: '$quiz', preserveNullAndEmptyArrays: true } },
      // exclude submissions for which quiz was deleted
      { $match: { quiz: { $ne: null } } },
    ];

    if (grade) pipeline.push({ $match: { 'quiz.grade': Number(grade) } });
    if (subject) pipeline.push({ $match: { 'quiz.subject': subject } });

    pipeline.push({ $sort: { createdAt: -1 } });

    pipeline.push({
      $facet: {
        metadata: [{ $count: 'total' }],
        data: [
          { $skip: skip },
          { $limit: pageLimit },
          {
            $project: {
              submissionId: '$_id',
              quizId: '$quiz._id',
              grade: '$quiz.grade',
              subject: '$quiz.subject',
              totalQuestions: '$quiz.totalQuestions',
              maxScore: '$quiz.maxScore',
              score: '$score',
              attempt: '$attempt',
              submittedAt: '$createdAt',
              rawSuggestions: '$suggestions'
            }
          }
        ]
      }
    });

    const agg = await Submission.aggregate(pipeline);
    const meta = (agg[0] && agg[0].metadata && agg[0].metadata[0]) || { total: 0 };
    const total = meta.total || 0;
    const totalPages = Math.max(1, Math.ceil(total / pageLimit));
    const rows = (agg[0] && agg[0].data) || [];

    // Normalize suggestions safely
    const data = rows.map(r => {
      let suggestions = [];
      if (Array.isArray(r.rawSuggestions) && r.rawSuggestions.length > 0) {
        const first = r.rawSuggestions[0];
        if (first && typeof first === 'object' && 'tips' in first) {
          suggestions = first.tips || [];
          if (typeof suggestions === 'string') suggestions = [suggestions];
        } else {
          // array of strings or other shape
          suggestions = r.rawSuggestions.filter(Boolean);
        }
      }

      return {
        submissionId: r.submissionId,
        quizId: r.quizId,
        grade: r.grade,
        subject: r.subject,
        totalQuestions: r.totalQuestions,
        maxScore: r.maxScore,
        score: r.score,
        attempt: r.attempt,
        submittedAt: r.submittedAt,
        suggestions,
      };
    });

  return res.json(data);
  } catch (err) {
    console.error("❌ Error fetching quiz history:", err);
    res.status(500).json({ message: "Server error" });
  }
}

// ✅ Retry Quiz
export async function retryQuiz(req, res) {
  try {
    const { quizId } = req.body;
    const username = req.user.username;

    if (!quizId) {
      return res.status(400).json({ message: "quizId is required" });
    }

    const quiz = await Quiz.findById(quizId);
  if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // 🔥 Get last attempt number and increment
    const lastSubmission = await Submission.findOne({ quizId, username })
      .sort({ attempt: -1 })
      .lean();

    const attempt = lastSubmission ? lastSubmission.attempt + 1 : 1;

    // We intentionally do NOT evaluate/save a submission here.
    // `submitQuiz` endpoint is responsible for accepting `responses`, evaluating them,
    // and saving a Submission. `retryQuiz` only provides the quiz and the next attempt number.
    let submissionData = null;

    // Fetch all submissions (old + possibly new one)
    const oldSubmissions = await Submission.find({ quizId, username })
      .sort({ createdAt: -1 })
      .select("score attempt createdAt suggestions");

    return res.json({
      quizId: quiz._id,
      grade: quiz.grade,
      subject: quiz.subject,
      totalQuestions: quiz.totalQuestions,
      maxScore: quiz.maxScore,
      difficulty: quiz.difficulty,
      questions: quiz.questions,
      currentAttempt: attempt,
      newSubmission: submissionData
        ? {
          submissionId: submissionData._id,
          score: submissionData.score,
          attempt: submissionData.attempt,
          suggestions: submissionData.suggestions,
        }
        : null,
      previousSubmissions: oldSubmissions,
      message: "You can retry this quiz; old submissions are preserved",
    });
  } catch (err) {
    console.error("❌ Error retrying quiz:", err);
    res.status(500).json({ message: "Server error" });
  }
}



export async function getHint(req, res) {
  try {
    const { quizId, questionId } = req.body;
    if (!quizId || !questionId) {
      return res.status(400).json({ message: "quizId and questionId are required" });
    }

    const quiz = await Quiz.findById(quizId);
  if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const question = quiz.questions.find(q => q._id.toString() === questionId);
  if (!question) return res.status(404).json({ message: "Question not found" });

    // If question already has a hint, return it
    if (question.hint) {
      return res.json({ questionId, hint: question.hint });
    }

    // Generate hint using AI
    const hint = await generateAIHint(question.question);

    // Optional: Save hint in quiz for future requests
    question.hint = hint;
    await quiz.save();

  return res.json({ questionId, hint });
  } catch (err) {
    console.error("❌ Error generating hint:", err);
    res.status(500).json({ message: "Server error" });
  }
}


export async function sendResultByEmail(req, res) {
  try {
    const { submissionId, email } = req.body;

    if (!submissionId || !email) {
      return res.status(400).json({ message: "submissionId and email are required" });
    }

    // Fetch submission and populate quiz details
    const submission = await Submission.findById(submissionId).populate("quizId");
  if (!submission) return res.status(404).json({ message: "Submission not found" });

    const quiz = submission.quizId;

    // Safely extract suggestions
    let suggestionsText = "None";
    if (submission.suggestions && submission.suggestions.length > 0) {
      suggestionsText = submission.suggestions
        .map(s => (s.tips ? s.tips : typeof s === "string" ? s : ""))
        .filter(Boolean)
        .join(", ");
    }

    // Build email content
    const emailContent = `
      <h2>Quiz Results</h2>
      <p>Hi ${submission.username},</p>
      <p>You completed the quiz <strong>${quiz.subject} - Grade ${quiz.grade}</strong>.</p>
      <p><strong>Score:</strong> ${submission.score} / ${quiz.maxScore}</p>
      <p><strong>Attempt:</strong> ${submission.attempt}</p>
      <p><strong>Suggestions:</strong> ${suggestionsText}</p>
      <p>Keep practicing!</p>
    `;

    // Send email
  await sendEmail(email, "Your Quiz Results", emailContent);

  return res.json({ message: "✅ Quiz result sent to email successfully" });
  } catch (err) {
    console.error("❌ Error sending quiz result email:", err);
    res.status(500).json({ message: "Server error" });
  }
}