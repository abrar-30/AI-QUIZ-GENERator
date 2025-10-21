import { useMemo, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { submitQuiz, useQuiz, getHint } from "../lib/api"
import { swrConfig } from "../lib/api"
import { fireConfetti } from "../lib/confetti"
import SendResultModal from "../components/send-result-modal"
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  Target, 
  Lightbulb, 
  CheckCircle, 
  AlertCircle, 
  Loader,
  BarChart3,
  Send,
  History,
  Award,
  HelpCircle,
  ChevronRight
} from "lucide-react"

type AnswerMap = Record<string, string>

export default function QuizAttemptPage() {
  const { quizId } = useParams()
  const navigate = useNavigate()
  const { data, error, isLoading } = useQuiz(quizId, swrConfig)
  const [answers, setAnswers] = useState<AnswerMap>({})
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  const [hints, setHints] = useState<Record<string, string>>({})
  const [loadingHints, setLoadingHints] = useState<Record<string, boolean>>({})
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showSendModal, setShowSendModal] = useState(false)

  const questions = useMemo(() => {
    return (data?.questions || []).map((q: any) => ({
      id: q._id || q.id,
      text: q.question || q.text,
      options: Array.isArray(q.options)
        ? q.options.map((o: any) => ({ label: o.label ?? o, text: o.text ?? String(o) }))
        : [],
      hint: q.hint,
    }))
  }, [data])

  function selectAnswer(qid: string, value: string) {
    setAnswers((prev) => ({ ...prev, [qid]: value }))
  }

  async function fetchHint(questionId: string) {
    if (!quizId) return
    setLoadingHints(prev => ({ ...prev, [questionId]: true }))
    try {
      const response = await getHint(quizId, questionId)
      setHints(prev => ({ ...prev, [questionId]: response.hint }))
    } catch (err) {
      console.error('Failed to fetch hint:', err)
    } finally {
      setLoadingHints(prev => ({ ...prev, [questionId]: false }))
    }
  }

  async function onSubmit() {
    if (!quizId) return
    setSubmitting(true)
    try {
      const payload = Object.entries(answers).map(([questionId, userResponse]) => ({ questionId, userResponse }))
      const res = await submitQuiz(quizId, payload)
      setResult(res)
      fireConfetti()
    } catch (err) {
      console.error('Submission failed:', err)
    } finally {
      setSubmitting(false)
    }
  }

  const progress = questions.length > 0 ? (Object.keys(answers).length / questions.length) * 100 : 0
  const answeredQuestions = Object.keys(answers).length

  // Inline styles object
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "2rem",
      display: "flex",
      flexDirection: "column" as const,
      gap: "1.5rem",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    },
    headerCard: {
      background: "white",
      padding: "2rem",
      borderRadius: "16px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      border: "1px solid #f0f0f0"
    },
    backButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      background: "transparent",
      color: "#667eea",
      border: "1px solid #667eea",
      padding: "0.75rem 1.25rem",
      borderRadius: "8px",
      fontSize: "0.95rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textDecoration: "none",
      marginBottom: "1.5rem"
    },
    backButtonHover: {
      background: "#667eea",
      color: "white",
      transform: "translateX(-2px)"
    },
    title: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      fontSize: "1.75rem",
      fontWeight: "700",
      color: "#1f2937",
      margin: "0 0 0.5rem 0"
    },
    titleIcon: {
      width: "28px",
      height: "28px",
      color: "#667eea"
    },
    quizInfo: {
      display: "flex",
      gap: "2rem",
      marginTop: "1.5rem",
      flexWrap: "wrap" as const
    },
    infoItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      color: "#6b7280",
      fontSize: "0.95rem"
    },
    progressCard: {
      background: "white",
      padding: "1.5rem",
      borderRadius: "16px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      border: "1px solid #f0f0f0",
      marginBottom: "1rem"
    },
    progressHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem"
    },
    progressText: {
      fontWeight: "600",
      color: "#374151"
    },
    progressBar: {
      height: "8px",
      background: "#e5e7eb",
      borderRadius: "4px",
      overflow: "hidden"
    },
    progressFill: {
      height: "100%",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      borderRadius: "4px",
      transition: "width 0.3s ease"
    },
    questionCard: {
      background: "white",
      padding: "2rem",
      borderRadius: "16px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      border: "1px solid #f0f0f0",
      marginBottom: "1.5rem"
    },
    questionHeader: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "1rem",
      marginBottom: "1.5rem"
    },
    questionTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#1f2937",
      margin: 0,
      lineHeight: "1.5"
    },
    hintButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      background: "transparent",
      color: "#f59e0b",
      border: "1px solid #f59e0b",
      padding: "0.5rem 1rem",
      borderRadius: "6px",
      fontSize: "0.875rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.3s ease",
      flexShrink: 0
    },
    hintButtonHover: {
      background: "#f59e0b",
      color: "white",
      transform: "translateY(-1px)"
    },
    hintSection: {
      background: "#fffbeb",
      border: "1px solid #fef3c7",
      borderRadius: "8px",
      padding: "1rem",
      marginTop: "1rem",
      marginBottom: "1.5rem"
    },
    hintText: {
      color: "#92400e",
      fontSize: "0.95rem",
      margin: 0,
      lineHeight: "1.5"
    },
    optionsGrid: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "0.75rem"
    },
    optionLabel: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      padding: "1rem 1.25rem",
      border: "2px solid #e5e7eb",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      background: "white"
    },
    optionLabelHover: {
      borderColor: "#667eea",
      transform: "translateX(4px)",
      boxShadow: "0 2px 8px rgba(102, 126, 234, 0.1)"
    },
    optionLabelSelected: {
      borderColor: "#667eea",
      background: "#f0f4ff",
      boxShadow: "0 2px 8px rgba(102, 126, 234, 0.15)"
    },
    radioInput: {
      width: "18px",
      height: "18px",
      accentColor: "#667eea"
    },
    optionText: {
      color: "#374151",
      fontSize: "1rem"
    },
    optionLabelText: {
      fontWeight: "600",
      color: "#667eea",
      minWidth: "24px"
    },
    actions: {
      display: "flex",
      gap: "1rem",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: "2rem"
    },
    submitButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      padding: "1rem 2rem",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      flex: 1
    },
    submitButtonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)"
    },
    submitButtonDisabled: {
      opacity: 0.6,
      cursor: "not-allowed",
      transform: "none"
    },
    historyButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      background: "transparent",
      color: "#6b7280",
      border: "1px solid #d1d5db",
      padding: "1rem 1.5rem",
      borderRadius: "8px",
      fontSize: "0.95rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.3s ease"
    },
    historyButtonHover: {
      background: "#f9fafb",
      color: "#374151",
      borderColor: "#9ca3af"
    },
    resultCard: {
      background: "white",
      padding: "2.5rem",
      borderRadius: "20px",
      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
      border: "1px solid #f0f0f0",
      textAlign: "center" as const,
      marginTop: "2rem"
    },
    resultTitle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "1rem",
      fontSize: "2rem",
      fontWeight: "700",
      color: "#1f2937",
      margin: "0 0 1.5rem 0"
    },
    scoreDisplay: {
      fontSize: "3.5rem",
      fontWeight: "800",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      margin: "1rem 0"
    },
    loadingState: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "1rem",
      padding: "4rem 2rem",
      color: "#6b7280",
      fontSize: "1.1rem"
    },
    errorState: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "1rem",
      padding: "3rem",
      background: "#fef2f2",
      color: "#dc2626",
      borderRadius: "12px",
      margin: "2rem 0"
    },
    loadingSpinner: {
      animation: "spin 1s linear infinite"
    }
  }

  // Helper functions for interactive effects
  const handleBackHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = "#667eea"
    e.currentTarget.style.color = "white"
    e.currentTarget.style.transform = "translateX(-2px)"
  }

  const handleBackLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = "transparent"
    e.currentTarget.style.color = "#667eea"
    e.currentTarget.style.transform = "translateX(0)"
  }

  const handleHintHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!loadingHints[e.currentTarget.dataset.questionId!]) {
      e.currentTarget.style.background = "#f59e0b"
      e.currentTarget.style.color = "white"
      e.currentTarget.style.transform = "translateY(-1px)"
    }
  }

  const handleHintLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!loadingHints[e.currentTarget.dataset.questionId!]) {
      e.currentTarget.style.background = "transparent"
      e.currentTarget.style.color = "#f59e0b"
      e.currentTarget.style.transform = "translateY(0)"
    }
  }

  const handleOptionHover = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (!e.currentTarget.querySelector('input')?.checked) {
      e.currentTarget.style.borderColor = "#667eea"
      e.currentTarget.style.transform = "translateX(4px)"
      e.currentTarget.style.boxShadow = "0 2px 8px rgba(102, 126, 234, 0.1)"
    }
  }

  const handleOptionLeave = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (!e.currentTarget.querySelector('input')?.checked) {
      e.currentTarget.style.borderColor = "#e5e7eb"
      e.currentTarget.style.transform = "translateX(0)"
      e.currentTarget.style.boxShadow = "none"
    }
  }

  const handleSubmitHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!submitting && answeredQuestions === questions.length) {
      e.currentTarget.style.transform = "translateY(-2px)"
      e.currentTarget.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.4)"
    }
  }

  const handleSubmitLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!submitting && answeredQuestions === questions.length) {
      e.currentTarget.style.transform = "translateY(0)"
      e.currentTarget.style.boxShadow = "none"
    }
  }

  const handleHistoryHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = "#f9fafb"
    e.currentTarget.style.color = "#374151"
    e.currentTarget.style.borderColor = "#9ca3af"
  }

  const handleHistoryLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = "transparent"
    e.currentTarget.style.color = "#6b7280"
    e.currentTarget.style.borderColor = "#d1d5db"
  }

  if (isLoading) return (
    <div style={styles.loadingState}>
      <Loader size={32} style={styles.loadingSpinner} />
      Loading quiz questions...
    </div>
  )

  if (error) return (
    <div style={styles.errorState} role="alert">
      <AlertCircle size={24} />
      Failed to load quiz. Please try again.
    </div>
  )

  if (!data) return null

  return (
    <section style={styles.container}>
      {/* Header Card */}
      <div style={styles.headerCard}>
        <button 
          style={styles.backButton}
          onClick={() => navigate(-1)}
          onMouseEnter={handleBackHover}
          onMouseLeave={handleBackLeave}
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>
        
        <h2 style={styles.title}>
          <BookOpen style={styles.titleIcon} />
          {data.subject ? `${data.subject} Quiz` : `Quiz ${quizId}`}
        </h2>
        
        <p style={{ color: "#6b7280", margin: "0 0 1rem 0" }}>
          {data.subject && `Grade ${data.grade} • `}Answer all questions to complete the quiz
        </p>

        <div style={styles.quizInfo}>
          <div style={styles.infoItem}>
            <Target size={18} />
            <span>{questions.length} Questions</span>
          </div>
          <div style={styles.infoItem}>
            <CheckCircle size={18} />
            <span>{answeredQuestions} Answered</span>
          </div>
          {data.difficulty && (
            <div style={styles.infoItem}>
              <BarChart3 size={18} />
              <span style={{ textTransform: 'capitalize' }}>{data.difficulty.toLowerCase()}</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div style={styles.progressCard}>
        <div style={styles.progressHeader}>
          <span style={styles.progressText}>Your Progress</span>
          <span style={styles.progressText}>{answeredQuestions}/{questions.length}</span>
        </div>
        <div style={styles.progressBar}>
          <div style={{...styles.progressFill, width: `${progress}%`}} />
        </div>
      </div>

      {/* Questions */}
      {questions.map((q: any, idx: number) => (
        <div style={styles.questionCard} key={q.id}>
          <div style={styles.questionHeader}>
            <h3 style={styles.questionTitle}>
              <span style={{ color: "#667eea", marginRight: "0.5rem" }}>Q{idx + 1}.</span>
              {q.text}
            </h3>
            <button 
              style={styles.hintButton}
              data-question-id={q.id}
              onClick={() => hints[q.id] ? setHints(prev => ({ ...prev, [q.id]: "" })) : fetchHint(q.id)}
              disabled={loadingHints[q.id]}
              onMouseEnter={handleHintHover}
              onMouseLeave={handleHintLeave}
            >
              <Lightbulb size={16} />
              {loadingHints[q.id] ? "Loading..." : hints[q.id] ? "Hide Hint" : "Get Hint"}
            </button>
          </div>

          {hints[q.id] && (
            <div style={styles.hintSection}>
              <p style={styles.hintText}>
                <strong>💡 Hint:</strong> {hints[q.id]}
              </p>
            </div>
          )}

          <div style={styles.optionsGrid}>
            {(q.options || []).map((opt: any) => (
              <label 
                key={opt.label}
                style={{
                  ...styles.optionLabel,
                  ...(answers[q.id] === opt.label ? styles.optionLabelSelected : {})
                }}
                onMouseEnter={handleOptionHover}
                onMouseLeave={handleOptionLeave}
              >
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  value={opt.label}
                  checked={answers[q.id] === opt.label}
                  onChange={() => selectAnswer(q.id, opt.label)}
                  style={styles.radioInput}
                />
                <span style={styles.optionLabelText}>{opt.label}.</span>
                <span style={styles.optionText}>{opt.text}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      {/* Action Buttons */}
      <div style={styles.actions}>
        <button 
          style={{
            ...styles.submitButton,
            ...(submitting || answeredQuestions !== questions.length ? styles.submitButtonDisabled : {})
          }}
          disabled={submitting || answeredQuestions !== questions.length}
          onClick={onSubmit}
          onMouseEnter={handleSubmitHover}
          onMouseLeave={handleSubmitLeave}
        >
          {submitting ? (
            <>
              <Loader size={18} style={styles.loadingSpinner} />
              Submitting...
            </>
          ) : (
            <>
              <Send size={18} />
              Submit Quiz ({answeredQuestions}/{questions.length})
            </>
          )}
        </button>

        <button 
          style={styles.historyButton}
          onClick={() => navigate("/history")}
          onMouseEnter={handleHistoryHover}
          onMouseLeave={handleHistoryLeave}
        >
          <History size={18} />
          View History
        </button>
      </div>

      {/* Results Section */}
      {result && (
        <div style={styles.resultCard} role="status">
          <Award size={48} style={{ color: "#f59e0b", margin: "0 auto 1rem" }} />
          <h3 style={styles.resultTitle}>
            Quiz Completed!
          </h3>
          <div style={styles.scoreDisplay}>
            {result.score}%
          </div>
          <p style={{ color: "#6b7280", fontSize: "1.1rem", marginBottom: "2rem" }}>
            {result.score >= 80 ? "Excellent work! 🎉" : 
             result.score >= 60 ? "Good job! 👍" : 
             "Keep practicing! 💪"}
          </p>
          
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "1rem 2rem",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onClick={() => setShowSendModal(true)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)"
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.4)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "none"
              }}
            >
              <Send size={18} />
              Share Results
            </button>
            
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "1rem 2rem",
                background: "transparent",
                color: "#6b7280",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "1rem",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onClick={() => navigate("/history")}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f9fafb"
                e.currentTarget.style.color = "#374151"
                e.currentTarget.style.borderColor = "#9ca3af"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent"
                e.currentTarget.style.color = "#6b7280"
                e.currentTarget.style.borderColor = "#d1d5db"
              }}
            >
              <History size={18} />
              View History
            </button>
          </div>
          {showSendModal && (
            <SendResultModal 
              submissionId={result.submissionId} 
              onClose={() => setShowSendModal(false)} 
            />
          )}
        </div>
      )}

      {/* Add CSS for spinner animation */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </section>
  )
}