import { type FormEvent, useState } from "react"
import { login } from "../lib/api"
import { saveToken } from "../lib/token"
import { useLocation, useNavigate } from "react-router-dom"
import { 
  LogIn, 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  Loader, 
  AlertCircle, 
  Award,
  BookOpen,
  Zap,
  CheckCircle
} from "lucide-react"

export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const loc = useLocation()

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await login(username, password)
      saveToken(res.token)
      const redirectTo = (loc.state as any)?.from?.pathname || "/dashboard"
      navigate(redirectTo, { replace: true })
    } catch (err: any) {
      setError(err.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  // Inline styles object
  const styles = {
    container: {
      minHeight: "100vh",
      height: "100vh",
      width: "100vw",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      position: "fixed" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: "hidden",
      margin: 0,
      boxSizing: "border-box" as const
    },
    backgroundAnimation: {
      position: "absolute" as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)",
      animation: "shimmer 3s ease-in-out infinite"
    },
    loginCard: {
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(20px)",
      borderRadius: "32px",
      boxShadow: "0 25px 80px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.2)",
      padding: "3.5rem",
      maxWidth: "480px",
      width: "100%",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      position: "relative" as const,
      zIndex: 10,
      transform: "translateY(0)",
      transition: "all 0.3s ease"
    },
    header: {
      textAlign: "center" as const,
      marginBottom: "2.5rem"
    },
    logo: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "1rem",
      marginBottom: "1.5rem"
    },
    logoIcon: {
      width: "64px",
      height: "64px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
      animation: "float 3s ease-in-out infinite"
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "800",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      margin: "0 0 0.5rem 0",
      letterSpacing: "-0.02em"
    },
    subtitle: {
      color: "#6b7280",
      fontSize: "1.1rem",
      margin: 0
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
    inputWrapper: {
      position: "relative" as const
    },
    input: {
      padding: "1.25rem 3.5rem 1.25rem 3.5rem",
      border: "2px solid #e5e7eb",
      borderRadius: "16px",
      fontSize: "1rem",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      background: "rgba(255, 255, 255, 0.8)",
      width: "100%",
      boxSizing: "border-box" as const,
      fontWeight: "500"
    },
    inputFocus: {
      borderColor: "#667eea",
      boxShadow: "0 0 0 4px rgba(102, 126, 234, 0.15), 0 4px 12px rgba(102, 126, 234, 0.1)",
      outline: "none",
      background: "rgba(255, 255, 255, 0.95)",
      transform: "translateY(-1px)"
    },
    inputHover: {
      borderColor: "#9ca3af"
    },
    inputIcon: {
      position: "absolute" as const,
      left: "1.25rem",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#667eea",
      width: "20px",
      height: "20px",
      transition: "color 0.3s ease"
    },
    passwordToggle: {
      position: "absolute" as const,
      right: "1.25rem",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      color: "#9ca3af",
      cursor: "pointer",
      width: "24px",
      height: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "6px",
      transition: "all 0.2s ease"
    },
    passwordToggleHover: {
      color: "#667eea",
      background: "rgba(102, 126, 234, 0.1)"
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
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.75rem",
      padding: "1.25rem 2rem",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
      color: "white",
      border: "none",
      borderRadius: "16px",
      fontSize: "1.1rem",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      width: "100%",
      position: "relative" as const,
      marginTop: "0.5rem",
      boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
      letterSpacing: "0.02em"
    },
    buttonHover: {
      transform: "translateY(-3px)",
      boxShadow: "0 12px 35px rgba(102, 126, 234, 0.5)"
    },
    buttonDisabled: {
      opacity: 0.6,
      cursor: "not-allowed",
      transform: "none"
    },
    loadingSpinner: {
      animation: "spin 1s linear infinite"
    },
    features: {
      marginTop: "2.5rem",
      paddingTop: "2rem",
      borderTop: "1px solid #e5e7eb"
    },
    featuresTitle: {
      textAlign: "center" as const,
      fontWeight: "600",
      color: "#374151",
      marginBottom: "1.5rem",
      fontSize: "1rem"
    },
    featuresGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "1rem"
    },
    feature: {
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      gap: "0.5rem",
      textAlign: "center" as const
    },
    featureIcon: {
      width: "32px",
      height: "32px",
      color: "#667eea"
    },
    featureText: {
      fontSize: "0.8rem",
      color: "#6b7280",
      fontWeight: "500"
    },
    demoCredentials: {
      background: "linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)",
      padding: "1.5rem",
      borderRadius: "16px",
      marginTop: "2rem",
      border: "1px solid #c7d2fe",
      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.1)"
    },
    demoTitle: {
      fontWeight: "600",
      color: "#374151",
      fontSize: "0.9rem",
      margin: "0 0 0.5rem 0"
    },
    demoText: {
      fontSize: "0.8rem",
      color: "#6b7280",
      margin: "0.25rem 0",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem"
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

  const handlePasswordToggleHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.color = "#667eea"
    e.currentTarget.style.background = "rgba(102, 126, 234, 0.1)"
  }

  const handlePasswordToggleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.color = "#9ca3af"
    e.currentTarget.style.background = "none"
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
      <div style={styles.backgroundAnimation} />
      <div style={styles.loginCard}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>
              <Award size={24} />
            </div>
          </div>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Sign in to your QuizMaster account</p>
        </div>

        <form onSubmit={onSubmit} style={styles.form} aria-label="Login form">
          {/* Username Input */}
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="username">
              <User style={styles.icon} />
              Username
            </label>
            <div style={styles.inputWrapper}>
              <User style={styles.inputIcon} />
              <input
                id="username"
                type="text"
                required
                style={styles.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onMouseEnter={handleInputMouseEnter}
                onMouseLeave={handleInputMouseLeave}
                placeholder="Enter your username"
                disabled={loading}
              />
            </div>
          </div>

          {/* Password Input */}
          <div style={styles.inputGroup}>
            <label style={styles.label} htmlFor="password">
              <Lock style={styles.icon} />
              Password
            </label>
            <div style={styles.inputWrapper}>
              <Lock style={styles.inputIcon} />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onMouseEnter={handleInputMouseEnter}
                onMouseLeave={handleInputMouseLeave}
                placeholder="Enter your password"
                disabled={loading}
              />
              <button
                type="button"
                style={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                onMouseEnter={handlePasswordToggleHover}
                onMouseLeave={handlePasswordToggleLeave}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div style={styles.error} role="alert">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {})
            }}
            type="submit"
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
          >
            {loading ? (
              <>
                <Loader size={18} style={styles.loadingSpinner} />
                Signing In...
              </>
            ) : (
              <>
                <LogIn size={18} />
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        <div style={styles.demoCredentials}>
          <h4 style={styles.demoTitle}>Demo Credentials</h4>
          <p style={styles.demoText}>
            <CheckCircle size={14} color="#10b981" />
            Username: demo
          </p>
          <p style={styles.demoText}>
            <CheckCircle size={14} color="#10b981" />
            Password: demo123
          </p>
        </div>

        {/* Features */}
        <div style={styles.features}>
          <h4 style={styles.featuresTitle}>Why Join QuizMaster?</h4>
          <div style={styles.featuresGrid}>
            <div style={styles.feature}>
              <Zap style={styles.featureIcon} />
              <span style={styles.featureText}>AI-Powered Quizzes</span>
            </div>
            <div style={styles.feature}>
              <BookOpen style={styles.featureIcon} />
              <span style={styles.featureText}>Multiple Subjects</span>
            </div>
            <div style={styles.feature}>
              <Award style={styles.featureIcon} />
              <span style={styles.featureText}>Track Progress</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  )
}