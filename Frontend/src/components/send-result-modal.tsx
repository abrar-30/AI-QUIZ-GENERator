import { type FormEvent, useState, useEffect } from "react"
import { sendResult } from "../lib/api"
import { Send, Mail, CheckCircle, AlertCircle, Loader, Share2 } from "lucide-react"

export default function SendResultModal({ 
  submissionId, 
  onClose 
}: { 
  submissionId: string
  onClose: () => void 
}) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // Handle overlay click to close modal
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus("loading")
    setError(null)
    try {
      await sendResult(submissionId, email)
      setStatus("success")
      // Reset form after 2 seconds
      setTimeout(() => {
        setStatus("idle")
        setEmail("")
      }, 2000)
    } catch (err: any) {
      setError(err.message || "Failed to send result")
      setStatus("error")
    }
  }

  // Inline styles object
  const styles = {
    overlay: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "1rem"
    },
    modal: {
      background: "white",
      borderRadius: "20px",
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
      padding: "2.5rem",
      maxWidth: "480px",
      width: "100%",
      position: "relative" as const,
      border: "1px solid #f0f0f0"
    },
    header: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      marginBottom: "2rem"
    },
    title: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#1f2937",
      margin: 0
    },
    titleIcon: {
      width: "28px",
      height: "28px",
      color: "#667eea"
    },
    form: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "1.5rem"
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
    helper: {
      color: "#6b7280",
      fontSize: "0.875rem",
      lineHeight: "1.5",
      margin: 0
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
      fontWeight: "500",
      margin: 0
    },
    success: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      background: "#f0fdf4",
      color: "#16a34a",
      padding: "1rem 1.25rem",
      borderRadius: "12px",
      border: "1px solid #bbf7d0",
      fontSize: "0.9rem",
      fontWeight: "500",
      margin: 0
    },
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.75rem",
      padding: "1.125rem 2rem",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      fontSize: "1rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      width: "100%",
      position: "relative" as const
    },
    buttonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)"
    },
    buttonDisabled: {
      opacity: 0.6,
      cursor: "not-allowed",
      transform: "none",
      boxShadow: "none"
    },
    buttonSuccess: {
      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
    },
    buttonError: {
      background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
    },
    loadingSpinner: {
      animation: "spin 1s linear infinite"
    },
    features: {
      background: "#f8fafc",
      padding: "1.5rem",
      borderRadius: "12px",
      marginTop: "1rem"
    },
    featuresTitle: {
      fontWeight: "600",
      color: "#374151",
      marginBottom: "1rem",
      fontSize: "0.95rem"
    },
    featureList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column" as const,
      gap: "0.5rem"
    },
    featureItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      color: "#6b7280",
      fontSize: "0.875rem"
    },
    featureIcon: {
      width: "16px",
      height: "16px",
      color: "#10b981"
    },
    closeButton: {
      position: "absolute" as const,
      top: "1.5rem",
      right: "1.5rem",
      background: "none",
      border: "none",
      fontSize: "1.5rem",
      color: "#9ca3af",
      cursor: "pointer",
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s ease"
    },
    closeButtonHover: {
      background: "#f3f4f6",
      color: "#374151"
    }
  }

  // Helper functions for interactive effects
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "#667eea"
    e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)"
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "#e5e7eb"
    e.target.style.boxShadow = "none"
  }

  const handleInputMouseEnter = (e: React.MouseEvent<HTMLInputElement>) => {
    if (document.activeElement !== e.target) {
      e.currentTarget.style.borderColor = "#9ca3af"
    }
  }

  const handleInputMouseLeave = (e: React.MouseEvent<HTMLInputElement>) => {
    if (document.activeElement !== e.target) {
      e.currentTarget.style.borderColor = "#e5e7eb"
    }
  }

  const handleButtonMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (status === "idle") {
      e.currentTarget.style.transform = "translateY(-2px)"
      e.currentTarget.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.4)"
    }
  }

  const handleButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (status === "idle") {
      e.currentTarget.style.transform = "translateY(0)"
      e.currentTarget.style.boxShadow = "none"
    }
  }

  const handleCloseHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = "#f3f4f6"
    e.currentTarget.style.color = "#374151"
  }

  const handleCloseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = "none"
    e.currentTarget.style.color = "#9ca3af"
  }

  // Get button style based on status
  const getButtonStyle = () => {
    switch (status) {
      case "success":
        return { ...styles.button, ...styles.buttonSuccess }
      case "error":
        return { ...styles.button, ...styles.buttonError }
      case "loading":
        return { ...styles.button, ...styles.buttonDisabled }
      default:
        return styles.button
    }
  }

  return (
    <div style={styles.overlay} onClick={handleOverlayClick}>
      <div style={styles.modal}>
        {/* Close Button */}
        <button
          style={styles.closeButton}
          onMouseEnter={handleCloseHover}
          onMouseLeave={handleCloseLeave}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>
            <Share2 style={styles.titleIcon} />
            Share Quiz Results
          </h2>
        </div>

        <form onSubmit={onSubmit} style={styles.form} aria-label="Send result form">
          {/* Email Input */}
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="recipient">
              <Mail style={styles.icon} />
              Recipient Email
            </label>
            <input
              id="recipient"
              type="email"
              required
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onMouseEnter={handleInputMouseEnter}
              onMouseLeave={handleInputMouseLeave}
              placeholder="Enter email address to share results..."
              disabled={status === "loading" || status === "success"}
            />
            <p style={styles.helper}>
              Send a detailed quiz result summary including scores, answers, and performance insights.
            </p>
          </div>

          {/* Success Message */}
          {status === "success" && (
            <div style={styles.success} role="alert">
              <CheckCircle size={18} />
              Results sent successfully! The recipient will receive an email shortly.
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div style={styles.error} role="alert">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            style={getButtonStyle()}
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
          >
            {status === "loading" ? (
              <>
                <Loader size={18} style={styles.loadingSpinner} />
                Sending Results...
              </>
            ) : status === "success" ? (
              <>
                <CheckCircle size={18} />
                Results Sent!
              </>
            ) : status === "error" ? (
              <>
                <AlertCircle size={18} />
                Try Again
              </>
            ) : (
              <>
                <Send size={18} />
                Send Results
              </>
            )}
          </button>
        </form>

        {/* Features Section */}
        <div style={styles.features}>
          <h4 style={styles.featuresTitle}>What's included in the results:</h4>
          <ul style={styles.featureList}>
            <li style={styles.featureItem}>
              <CheckCircle style={styles.featureIcon} />
              Complete score breakdown
            </li>
            <li style={styles.featureItem}>
              <CheckCircle style={styles.featureIcon} />
              Question-by-question analysis
            </li>
            <li style={styles.featureItem}>
              <CheckCircle style={styles.featureIcon} />
              Performance insights
            </li>
            <li style={styles.featureItem}>
              <CheckCircle style={styles.featureIcon} />
              Time spent and accuracy
            </li>
          </ul>
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