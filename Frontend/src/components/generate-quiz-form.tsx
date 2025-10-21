// src/components/GenerateQuizForm.tsx

import { type FormEvent, useState } from "react"
import { createQuiz } from "../lib/api"
import { useNavigate } from "react-router-dom"
import { Zap, BookOpen, Hash, Target, Gauge, AlertCircle, Loader } from "lucide-react"

export default function GenerateQuizForm() {
  const [grade, setGrade] = useState("")
  const [subject, setSubject] = useState("")
  const [totalQuestions, setTotalQuestions] = useState(5)
  const [maxScore, setMaxScore] = useState(100)
  const [difficulty, setDifficulty] = useState<"EASY" | "MEDIUM" | "HARD">("MEDIUM")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await createQuiz({ grade, subject, totalQuestions, maxScore, difficulty })
      navigate(`/quiz/${res.quizId}`)
    } catch (err: any) {
      setError(err.message || "Failed to generate quiz")
    } finally {
      setLoading(false)
    }
  }

  // The 'styles' object and all hover/focus handlers have been removed.
  // All styling is now in the <style> block below.

  return (
    // Use a React Fragment <> as the root
    <>
      {/* Main Form (no header or container) */}
      <form 
        onSubmit={onSubmit} 
        className="quiz-form" // Replaced 'generate-quiz-form'
        aria-label="Generate quiz form"
      >
        {/* Grade Input */}
        <div className="input-group">
          <label className="input-label" htmlFor="grade">
            <BookOpen className="input-icon" />
            Grade Level
          </label>
          <input
            id="grade"
            className="input-field"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="e.g., 6th Grade, High School, College"
            required
          />
        </div>

        {/* Subject Input */}
        <div className="input-group">
          <label className="input-label" htmlFor="subject">
            <BookOpen className="input-icon" />
            Subject
          </label>
          <input
            id="subject"
            className="input-field"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g., Biology, Mathematics, History"
            required
          />
        </div>

        {/* Total Questions */}
        <div className="input-group">
          <label className="input-label" htmlFor="totalQuestions">
            <Hash className="input-icon" />
            Total Questions
          </label>
          <input
            id="totalQuestions"
            type="number"
            min={1}
            max={50}
            className="input-field"
            value={totalQuestions}
            onChange={(e) => setTotalQuestions(Number.parseInt(e.target.value || "1"))}
          />
        </div>

        {/* Max Score */}
        <div className="input-group">
          <label className="input-label" htmlFor="maxScore">
            <Target className="input-icon" />
            Maximum Score
          </label>
          <input
            id="maxScore"
            type="number"
            min={1}
            max={1000}
            className="input-field"
            value={maxScore}
            onChange={(e) => setMaxScore(Number.parseInt(e.target.value || "100"))}
          />
        </div>

        {/* Difficulty Select */}
        <div className="input-group form-full-width">
          <label className="input-label" htmlFor="difficulty">
            <Gauge className="input-icon" />
            Difficulty Level
          </label>
          <select
            id="difficulty"
            className="select-field"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as "EASY" | "MEDIUM" | "HARD")}
          >
            <option value="EASY" className="select-option">🎯 Easy - Fundamental concepts</option>
            <option value="MEDIUM" className="select-option">⚡ Medium - Balanced challenge</option>
            <option value="HARD" className="select-option">🔥 Hard - Advanced topics</option>
          </select>
        </div>

        {/* Error Display */}
        {error && (
          <div className="error-message form-full-width" role="alert">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {/* Submit Button */}
        <div className="submit-button-wrapper form-full-width">
          <button
            type="submit"
            disabled={loading}
            className="submit-button"
          >
            {loading ? (
              <>
                <Loader size={20} className="loading-spinner" />
                Generating Quiz...
              </>
            ) : (
              <>
                <Zap size={20} />
                Generate Quiz
              </>
            )}
          </button>
        </div>
      </form>

      {/* Features Grid */}
      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-icon">
            <Zap size={24} />
          </div>
          <h3 className="feature-title">AI-Powered Generation</h3>
          <p className="feature-desc">
            Our advanced AI creates unique, tailored questions based on your specifications
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <Target size={24} />
          </div>
          <h3 className="feature-title">Customizable Difficulty</h3>
          <p className="feature-desc">
            Choose from Easy, Medium, or Hard levels to match your learning needs
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            <BookOpen size={24} />
          </div>
          <h3 className="feature-title">Multiple Subjects</h3>
          <p className="feature-desc">
            Support for various academic subjects and grade levels
          </p>
        </div>
      </div>

      {/* Add CSS for spinner animation */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .loading-spinner {
            animation: spin 1s linear infinite;
          }

          /* --- Base Styles (Desktop) --- */
          .quiz-form {
            background: white;
            padding: 3rem;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            border: 1px solid #f0f0f0;
          }
          .form-full-width {
            grid-column: 1 / -1;
          }
          .input-group {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
          }
          .input-label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 600;
            color: #374151;
            font-size: 0.95rem;
          }
          .input-icon {
            width: 18px;
            height: 18px;
            color: #667eea;
          }
          .input-field,
          .select-field {
            padding: 1rem 1.25rem;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            font-size: 16px; /* Prevents iOS zoom */
            transition: all 0.3s ease;
            background: white;
            width: 100%;
            box-sizing: border-box;
          }
          .select-field {
            cursor: pointer;
            appearance: none;
            background-image: url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23666' d='M2 0L0 2h4zm0 5L0 3h4z'/></svg>");
            background-repeat: no-repeat;
            background-position: right 1rem center;
            background-size: 8px 10px;
          }
          .input-field:hover,
          .select-field:hover {
            border-color: #9ca3af;
          }
          .input-field:focus,
          .select-field:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            outline: none;
          }
          .select-option {
            padding: 0.5rem;
          }
          .error-message {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: #fef2f2;
            color: #dc2626;
            padding: 1rem 1.25rem;
            border-radius: 12px;
            border: 1px solid #fecaca;
            font-size: 0.9rem;
            font-weight: 500;
          }
          .submit-button-wrapper {
            display: flex;
            justify-content: center;
            margin-top: 1rem;
          }
          .submit-button {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1.25rem 3rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            min-width: 200px;
            justify-content: center;
          }
          .submit-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
          }
          .submit-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }

          /* --- Feature Grid --- */
          .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-top: 3rem;
          }
          .feature-card {
            background: white;
            padding: 2rem;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            text-align: center;
            border: 1px solid #f0f0f0;
          }
          .feature-icon {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            margin: 0 auto 1rem auto;
          }
          .feature-title {
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: #374151;
          }
          .feature-desc {
            color: #6b7280;
            font-size: 0.9rem;
            line-height: 1.5;
          }

          /* --- Tablet & Large Phone Styles --- */
          @media (max-width: 768px) {
            .quiz-form {
              grid-template-columns: 1fr; /* Stack form fields */
              padding: 1.5rem;
              gap: 1.5rem;
            }
            .submit-button {
              width: 100%;
              padding: 1rem;
              font-size: 1rem;
            }
            .feature-grid {
              margin-top: 2rem;
              gap: 1rem;
            }
            .feature-card {
              padding: 1.5rem;
            }
          }
          
          /* --- Small Mobile Styles --- */
          @media (max-width: 400px) {
            .quiz-form {
              padding: 1.5rem 1rem; /* Reduce side padding */
            }
            .feature-card {
              padding: 1.25rem 1rem;
            }
            .feature-title {
              font-size: 1rem;
            }
            .feature-desc {
              font-size: 0.85rem;
            }
          }
        `}
      </style>
    </>
  )
}