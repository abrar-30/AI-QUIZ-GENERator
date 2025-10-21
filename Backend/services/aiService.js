import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set. Please check your .env file.");
}

const openai = new OpenAI({ apiKey });



export async function generateAIQuiz(grade, subject, totalQuestions, difficulty) {
  const prompt = `
Generate ${totalQuestions} ${difficulty} level quiz questions for grade ${grade} in ${subject}.
Each question should have 4 options (A, B, C, D) and mention the correct answer.
Return ONLY a JSON array like:
[
  {
    "question": "What is 2+2?",
    "options": ["1","2","3","4"],
    "correctAnswer": "4",
    "difficulty": "${difficulty.toLowerCase()}"
  }
]
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    let responseText = completion.choices[0].message.content.trim();

    // Remove ```json or ``` markers if present
    responseText = responseText.replace(/```json|```/g, "").trim();

    // Parse JSON output
    let questions = [];
    try {
      questions = JSON.parse(responseText);
    } catch (err) {
      console.error("AI response not JSON, fallback:", responseText);
    }

    return questions;
  } catch (err) {
    console.error("AI error:", err);
    return [];
  }
}

/**
 * Evaluate quiz answers using AI and generate suggestions
 * Returns { score, suggestions }
 */
export async function evaluateQuizAI(quiz, answers) {
  let rawScore = 0; // Tracks the number of correct answers
  const suggestions = [];
  const performance = { easy: 0, medium: 0, hard: 0, total: 0, accuracy: 0 };

  // Map questions by ID
  const questionMap = new Map();
  quiz.questions.forEach(q => questionMap.set(q._id.toString(), q));

  // Enrich answers with isCorrect & difficulty
  const enrichedAnswers = answers.map(a => {
    const q = questionMap.get(a.qId);
    if (!q) return { ...a, isCorrect: false, difficulty: "unknown", topic: "unknown" };

    const isCorrect = a.answer === q.correctAnswer;
    if (isCorrect) {
      rawScore++;
      performance[q.difficulty.toLowerCase()]++;
      performance.total++;
    }

    return {
      ...a,
      isCorrect,
      difficulty: q.difficulty,
      topic: q.topic || "General"
    };
  });

  // Normalize score based on total score and number of questions
  const normalizedScore = quiz.totalQuestions > 0
    ? (rawScore / quiz.totalQuestions) * quiz.maxScore
    : 0;

  performance.accuracy = quiz.totalQuestions > 0
    ? (performance.total / quiz.totalQuestions) * 100
    : 0;

  // Prepare wrong answers for AI suggestions
  const wrongQuestions = enrichedAnswers.filter(a => !a.isCorrect);
  if (wrongQuestions.length > 0) {
    const wrongTopics = [...new Set(wrongQuestions.map(a => a.topic))].join(", ");
    const prompt = `
User answered ${wrongQuestions.length} out of ${quiz.totalQuestions} questions incorrectly.
User accuracy: ${performance.accuracy.toFixed(2)}%.
Topics of wrong answers: ${wrongTopics}.
Based on wrong topics, give suggestions.
Provide 2 personalized improvement tips to help the user improve on these topics.

Return ONLY a JSON array of 2 strings.
`;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      });

      let responseText = completion.choices[0].message.content.trim();
      responseText = responseText.replace(/```json|```/g, "").trim();

      const aiTips = JSON.parse(responseText);
      if (Array.isArray(aiTips)) suggestions.push(...aiTips);
    } catch (err) {
      console.error("AI suggestion generation failed:", err);
      suggestions.push(
        "AI could not generate specific tips. Please review incorrect questions and focus on the topics mentioned."
      );
    }
  }

  return { score: normalizedScore, suggestions, answers: enrichedAnswers, performance };
}



export async function generateAIHint(questionText) {
  const prompt = `
Provide a concise hint for the following question to help the user answer it correctly:
"${questionText}"
Return only the hint as plain text.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const hint = completion.choices[0].message.content.trim();
    return hint;
  } catch (err) {
    console.error("AI hint generation error:", err);
    return "Hint not available at the moment.";
  }
}