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

  // Inline styles object
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "2rem"
    },
    header: {
      textAlign: "center" as const,
      marginBottom: "3rem"
    },
    title: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      fontSize: "2.5rem",
      fontWeight: "700",
      marginBottom: "0.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "1rem"
    },
    subtitle: {
      color: "#6b7280",
      fontSize: "1.1rem",
      margin: 0
    },
    form: {
      background: "white",
      padding: "3rem",
      borderRadius: "20px",
      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "2rem",
      border: "1px solid #f0f0f0"
    },
    formFullWidth: {
      gridColumn: "1 / -1"
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "0.75rem"
    },
    label: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontWeight: "600",
      color: "#374151",
      fontSize: "0.95rem"
    },
    icon: {
      width: "18px",
      height: "18px",
      color: "#667eea"
    },
    input: {
      padding: "1rem 1.25rem",
      border: "2px solid #e5e7eb",
      borderRadius: "12px",
      fontSize: "1rem",
      transition: "all 0.3s ease",
      background: "white",
      width: "100%",
      boxSizing: "border-box" as const
    },
    inputFocus: {
      borderColor: "#667eea",
      boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
      outline: "none"
    },
    inputHover: {
      borderColor: "#9ca3af"
    },
    select: {
      padding: "1rem 1.25rem",
      border: "2px solid #e5e7eb",
      borderRadius: "12px",
      fontSize: "1rem",
      transition: "all 0.3s ease",
      background: "white",
      width: "100%",
      cursor: "pointer",
      appearance: "none" as const,
      backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='%23666' d='M2 0L0 2h4zm0 5L0 3h4z'/></svg>")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 1rem center",
      backgroundSize: "8px 10px"
    },
    difficultyOption: {
      padding: "0.5rem"
    },
    error: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      background: "#fef2f2",
      color: "#dc2626",
      padding: "1rem 1.25rem",
      borderRadius: "12px",
      border: "1px solid #fecaca",
      fontSize: "0.9rem",
      fontWeight: "500"
    },
    submitButton: {
      gridColumn: "1 / -1",
      display: "flex",
      justifyContent: "center",
      marginTop: "1rem"
    },
    button: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      padding: "1.25rem 3rem",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      fontSize: "1.1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      minWidth: "200px",
      justifyContent: "center"
    },
    buttonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)"
    },
    buttonDisabled: {
      opacity: 0.6,
      cursor: "not-allowed",
      transform: "none"
    },
    loadingSpinner: {
      animation: "spin 1s linear infinite"
    },
    featureGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "1.5rem",
      marginTop: "3rem"
    },
    featureCard: {
      background: "white",
      padding: "2rem",
      borderRadius: "16px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      textAlign: "center" as const,
      border: "1px solid #f0f0f0"
    },
    featureIcon: {
      width: "50px",
      height: "50px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      margin: "0 auto 1rem auto"
    },
    featureTitle: {
      fontSize: "1.1rem",
      fontWeight: "600",
      marginBottom: "0.5rem",
      color: "#374151"
    },
    featureDesc: {
      color: "#6b7280",
      fontSize: "0.9rem",
      lineHeight: "1.5"
    }
  }

  // Helper functions for interactive effects
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "#667eea"
    e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)"
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "#e5e7eb"
    e.target.style.boxShadow = "none"
  }

  const handleInputMouseEnter = (e: React.MouseEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (document.activeElement !== e.target) {
      e.currentTarget.style.borderColor = "#9ca3af"
    }
  }

  const handleInputMouseLeave = (e: React.MouseEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (document.activeElement !== e.target) {
      e.currentTarget.style.borderColor = "#e5e7eb"
    }
  }

  const handleButtonMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!loading) {
      e.currentTarget.style.transform = "translateY(-2px)"
      e.currentTarget.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.4)"
    }
  }

  const handleButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!loading) {
      e.currentTarget.style.transform = "translateY(0)"
      e.currentTarget.style.boxShadow = "none"
    }
  }

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <h1 style={styles.title}>
          <Zap size={32} />
          Generate Your Quiz
        </h1>
        <p style={styles.subtitle}>
          Create a personalized quiz with your preferred settings and difficulty level
        </p>
      </div>

      {/* Main Form */}
      <form onSubmit={onSubmit} style={styles.form} aria-label="Generate quiz form">
        {/* Grade Input */}
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="grade">
            <BookOpen style={styles.icon} />
            Grade Level
          </label>
          <input
            id="grade"
            style={styles.input}
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onMouseEnter={handleInputMouseEnter}
            onMouseLeave={handleInputMouseLeave}
            placeholder="e.g., 6th Grade, High School, College"
            required
          />
        </div>

        {/* Subject Input */}
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="subject">
            <BookOpen style={styles.icon} />
            Subject
          </label>
          <input
            id="subject"
            style={styles.input}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onMouseEnter={handleInputMouseEnter}
            onMouseLeave={handleInputMouseLeave}
            placeholder="e.g., Biology, Mathematics, History"
            required
          />
        </div>

        {/* Total Questions */}
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="totalQuestions">
            <Hash style={styles.icon} />
            Total Questions
          </label>
          <input
            id="totalQuestions"
            type="number"
            min={1}
            max={50}
            style={styles.input}
            value={totalQuestions}
            onChange={(e) => setTotalQuestions(Number.parseInt(e.target.value || "1"))}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onMouseEnter={handleInputMouseEnter}
            onMouseLeave={handleInputMouseLeave}
          />
        </div>

        {/* Max Score */}
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="maxScore">
            <Target style={styles.icon} />
            Maximum Score
          </label>
          <input
            id="maxScore"
            type="number"
            min={1}
            max={1000}
            style={styles.input}
            value={maxScore}
            onChange={(e) => setMaxScore(Number.parseInt(e.target.value || "100"))}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onMouseEnter={handleInputMouseEnter}
            onMouseLeave={handleInputMouseLeave}
          />
        </div>

        {/* Difficulty Select */}
        <div style={{...styles.inputGroup, ...styles.formFullWidth}}>
          <label style={styles.label} htmlFor="difficulty">
            <Gauge style={styles.icon} />
            Difficulty Level
          </label>
          <select
            id="difficulty"
            style={styles.select}
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as "EASY" | "MEDIUM" | "HARD")}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onMouseEnter={handleInputMouseEnter}
            onMouseLeave={handleInputMouseLeave}
          >
            <option value="EASY" style={styles.difficultyOption}>🎯 Easy - Fundamental concepts</option>
            <option value="MEDIUM" style={styles.difficultyOption}>⚡ Medium - Balanced challenge</option>
            <option value="HARD" style={styles.difficultyOption}>🔥 Hard - Advanced topics</option>
          </select>
        </div>

        {/* Error Display */}
        {error && (
          <div style={{...styles.error, ...styles.formFullWidth}} role="alert">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {/* Submit Button */}
        <div style={styles.submitButton}>
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {})
            }}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
          >
            {loading ? (
              <>
                <Loader size={20} style={styles.loadingSpinner} />
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
      <div style={styles.featureGrid}>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>
            <Zap size={24} />
          </div>
          <h3 style={styles.featureTitle}>AI-Powered Generation</h3>
          <p style={styles.featureDesc}>
            Our advanced AI creates unique, tailored questions based on your specifications
          </p>
        </div>
        
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>
            <Target size={24} />
          </div>
          <h3 style={styles.featureTitle}>Customizable Difficulty</h3>
          <p style={styles.featureDesc}>
            Choose from Easy, Medium, or Hard levels to match your learning needs
          </p>
        </div>
        
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>
            <BookOpen size={24} />
          </div>
          <h3 style={styles.featureTitle}>Multiple Subjects</h3>
          <p style={styles.featureDesc}>
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
        `}
      </style>
    </div>
  )
}