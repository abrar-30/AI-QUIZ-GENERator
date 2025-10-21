import { useState } from "react"
import { retryQuiz, useHistory, swrConfig } from "../lib/api"
import { Link } from "react-router-dom"
import { 
  History, 
  Search, 
  Calendar, 
  BookOpen, 
  TrendingUp, 
  RefreshCw, 
  ExternalLink,
  Filter,
  Award,
  Clock,
  BarChart3,
  Loader,
  AlertCircle,
  FileText
} from "lucide-react"

export default function HistoryPage() {
  const [subject, setSubject] = useState("")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const { data, error, isLoading, mutate } = useHistory({ subject, from, to }, swrConfig)

  async function onRetry(quizId: string) {
    const res = await retryQuiz(quizId)
    window.location.href = `/quiz/${res.quizId}`
  }

  // Inline styles object
  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "2rem",
      display: "flex",
      flexDirection: "column" as const,
      gap: "2rem",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem"
    },
    title: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      fontSize: "2.5rem",
      fontWeight: "700",
      margin: 0
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "1rem",
      marginBottom: "2rem"
    },
    statCard: {
      background: "white",
      padding: "1.5rem",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      display: "flex",
      alignItems: "center",
      gap: "1rem"
    },
    statIcon: {
      width: "50px",
      height: "50px",
      borderRadius: "12px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white"
    },
    statContent: {
      display: "flex",
      flexDirection: "column" as const
    },
    statValue: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#1f2937"
    },
    statLabel: {
      color: "#6b7280",
      fontSize: "0.9rem"
    },
    filterCard: {
      background: "white",
      padding: "2rem",
      borderRadius: "16px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "1.5rem",
      marginBottom: "2rem"
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
      padding: "0.875rem 1rem",
      border: "2px solid #e5e7eb",
      borderRadius: "8px",
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
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      padding: "0.875rem 1.5rem",
      borderRadius: "8px",
      border: "none",
      fontSize: "0.95rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textDecoration: "none"
    },
    filterButton: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      alignSelf: "end"
    },
    buttonHover: {
      transform: "translateY(-1px)",
      boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)"
    },
    tableCard: {
      background: "white",
      borderRadius: "16px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      overflow: "hidden"
    },
    table: {
      width: "100%",
      borderCollapse: "collapse" as const,
      fontSize: "0.95rem"
    },
    tableHeader: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white"
    },
    tableHeaderCell: {
      padding: "1.25rem 1rem",
      textAlign: "left" as const,
      fontWeight: "600",
      fontSize: "0.9rem",
      textTransform: "uppercase" as const,
      letterSpacing: "0.5px"
    },
    tableCell: {
      padding: "1.25rem 1rem",
      borderBottom: "1px solid #f3f4f6",
      color: "#374151"
    },
    tableRow: {
      transition: "background-color 0.2s ease"
    },
    tableRowHover: {
      background: "#f9fafb"
    },
    scoreCell: {
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem"
    },
    scoreHigh: {
      color: "#10b981"
    },
    scoreMedium: {
      color: "#f59e0b"
    },
    scoreLow: {
      color: "#ef4444"
    },
    actionCell: {
      display: "flex",
      gap: "0.5rem"
    },
    actionButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.5rem 1rem",
      borderRadius: "6px",
      border: "none",
      fontSize: "0.85rem",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textDecoration: "none"
    },
    openButton: {
      background: "transparent",
      color: "#667eea",
      border: "1px solid #667eea"
    },
    retryButton: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      border: "1px solid transparent"
    },
    loadingState: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "1rem",
      padding: "3rem",
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
      margin: "1rem 0"
    },
    emptyState: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      padding: "4rem 2rem",
      textAlign: "center" as const,
      color: "#6b7280"
    },
    emptyIcon: {
      width: "80px",
      height: "80px",
      color: "#d1d5db",
      marginBottom: "1.5rem"
    },
    loadingSpinner: {
      animation: "spin 1s linear infinite"
    }
  }

  // Helper functions
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "#667eea"
    e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)"
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "#e5e7eb"
    e.target.style.boxShadow = "none"
  }

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "translateY(-1px)"
    e.currentTarget.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.3)"
  }

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "translateY(0)"
    e.currentTarget.style.boxShadow = "none"
  }

  const handleRowHover = (e: React.MouseEvent<HTMLTableRowElement>) => {
    e.currentTarget.style.backgroundColor = "#f9fafb"
  }

  const handleRowLeave = (e: React.MouseEvent<HTMLTableRowElement>) => {
    e.currentTarget.style.backgroundColor = "transparent"
  }

  // Calculate stats from data
  const stats = {
    totalAttempts: Array.isArray(data) ? data.length : 0,
    averageScore: Array.isArray(data) && data.length > 0 
      ? Math.round(data.reduce((acc, item) => acc + (item.score || 0), 0) / data.length)
      : 0,
    bestScore: Array.isArray(data) && data.length > 0
      ? Math.max(...data.map(item => item.score || 0))
      : 0
  }

  // Get score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 80) return styles.scoreHigh
    if (score >= 60) return styles.scoreMedium
    return styles.scoreLow
  }

  return (
    <section style={styles.container} aria-labelledby="history-title">
      {/* Header */}
      <div style={styles.header}>
        <h1 id="history-title" style={styles.title}>
          <History size={32} />
          Quiz History
        </h1>
      </div>

      {/* Stats Overview */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <FileText size={24} />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statValue}>{stats.totalAttempts}</div>
            <div style={styles.statLabel}>Total Attempts</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <TrendingUp size={24} />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statValue}>{stats.averageScore}%</div>
            <div style={styles.statLabel}>Average Score</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <Award size={24} />
          </div>
          <div style={styles.statContent}>
            <div style={styles.statValue}>{stats.bestScore}%</div>
            <div style={styles.statLabel}>Best Score</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={styles.filterCard}>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="filter-subject">
            <BookOpen style={styles.icon} />
            Subject
          </label>
          <input
            id="filter-subject"
            style={styles.input}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder="e.g., Mathematics, Biology"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="from">
            <Calendar style={styles.icon} />
            From Date
          </label>
          <input
            id="from"
            type="date"
            style={styles.input}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="to">
            <Calendar style={styles.icon} />
            To Date
          </label>
          <input
            id="to"
            type="date"
            style={styles.input}
            value={to}
            onChange={(e) => setTo(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
        </div>
        <div style={{ alignSelf: "end" }}>
          <button
            style={{...styles.button, ...styles.filterButton}}
            onClick={() => mutate()}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
          >
            <Filter size={16} />
            Apply Filters
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div style={styles.loadingState}>
          <Loader size={24} style={styles.loadingSpinner} />
          Loading your quiz history...
        </div>
      )}

      {/* Error State */}
      {error && (
        <div style={styles.errorState} role="alert">
          <AlertCircle size={24} />
          Failed to load quiz history. Please try again.
        </div>
      )}

      {/* Table */}
      {!isLoading && !error && (
        <div style={styles.tableCard} aria-live="polite">
          <table style={styles.table}>
            <thead style={styles.tableHeader}>
              <tr>
                <th style={styles.tableHeaderCell}>Subject</th>
                <th style={styles.tableHeaderCell}>Date & Time</th>
                <th style={styles.tableHeaderCell}>Score</th>
                <th style={styles.tableHeaderCell}>Attempt</th>
                <th style={styles.tableHeaderCell}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data.length > 0 ? (
                data.map((it: any) => (
                  <tr 
                    key={it.submissionId} 
                    style={styles.tableRow}
                    onMouseEnter={handleRowHover}
                    onMouseLeave={handleRowLeave}
                  >
                    <td style={styles.tableCell}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <BookOpen size={16} color="#667eea" />
                        {it.subject || "General"}
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Clock size={16} color="#6b7280" />
                        {it.submittedAt ? new Date(it.submittedAt).toLocaleString() : "-"}
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      {typeof it.score === "number" ? (
                        <div style={{...styles.scoreCell, ...getScoreColor(it.score)}}>
                          <BarChart3 size={16} />
                          {it.score}%
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td style={styles.tableCell}>
                      #{typeof it.attempt === "number" ? it.attempt : "-"}
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.actionCell}>
                        <Link
                          to={`/quiz/${it.quizId}`}
                          style={{...styles.actionButton, ...styles.openButton}}
                          onMouseEnter={handleButtonHover}
                          onMouseLeave={handleButtonLeave}
                        >
                          <ExternalLink size={14} />
                          Review
                        </Link>
                        <button
                          style={{...styles.actionButton, ...styles.retryButton}}
                          onClick={() => onRetry(it.quizId)}
                          onMouseEnter={handleButtonHover}
                          onMouseLeave={handleButtonLeave}
                        >
                          <RefreshCw size={14} />
                          Retry
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={styles.tableCell}>
                    <div style={styles.emptyState}>
                      <FileText style={styles.emptyIcon} />
                      <h3 style={{ color: "#374151", marginBottom: "0.5rem" }}>
                        No quiz attempts found
                      </h3>
                      <p>Your quiz history will appear here once you start taking quizzes.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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