import { Link, useLocation, useNavigate } from "react-router-dom"
import { clearToken, getToken } from "../lib/token"
import { Home, Zap, History, LogOut, LogIn, Award } from "lucide-react"

export function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const authed = !!getToken()

  function logout() {
    clearToken()
    navigate("/login", { replace: true })
  }

  // Inline styles object
  const styles = {
    navbar: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "0 2rem",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      position: "sticky" as const,
      top: 0,
      zIndex: 1000,
      borderBottom: "3px solid rgba(255, 255, 255, 0.1)"
    },
    navbarInner: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "70px"
    },
    brand: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "white",
      textDecoration: "none"
    },
    brandIcon: {
      background: "rgba(255, 255, 255, 0.2)",
      borderRadius: "8px",
      padding: "0.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    navlinks: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem"
    },
    navLink: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.75rem 1.25rem",
      borderRadius: "8px",
      textDecoration: "none",
      fontWeight: "600",
      fontSize: "0.9rem",
      transition: "all 0.3s ease",
      border: "none",
      cursor: "pointer",
      background: "transparent",
      color: "white"
    },
    navLinkActive: {
      background: "rgba(255, 255, 255, 0.15)",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
    },
    navLinkHover: {
      background: "rgba(255, 255, 255, 0.1)",
      transform: "translateY(-1px)"
    },
    primaryBtn: {
      background: "rgba(255, 255, 255, 0.2)",
      color: "white",
      border: "2px solid rgba(255, 255, 255, 0.3)"
    },
    secondaryBtn: {
      background: "rgba(255, 255, 255, 0.1)",
      color: "white",
      border: "2px solid rgba(255, 255, 255, 0.2)"
    },
    loginBtn: {
      background: "white",
      color: "#667eea",
      border: "2px solid white"
    },
    icon: {
      width: "18px",
      height: "18px"
    }
  }

  // Helper function to determine if link is active
  const isActive = (path: string) => pathname === path

  // Helper function for button hover effects
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>, isActive: boolean) => {
    if (!isActive) {
      e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"
      e.currentTarget.style.transform = "translateY(-1px)"
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>, isActive: boolean) => {
    if (!isActive) {
      e.currentTarget.style.background = "transparent"
      e.currentTarget.style.transform = "translateY(0)"
    }
  }

  // Helper function for login button hover effects
  const handleLoginMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = "rgba(255, 255, 255, 0.9)"
    e.currentTarget.style.transform = "translateY(-1px)"
    e.currentTarget.style.boxShadow = "0 4px 15px rgba(255, 255, 255, 0.3)"
  }

  const handleLoginMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = "white"
    e.currentTarget.style.transform = "translateY(0)"
    e.currentTarget.style.boxShadow = "none"
  }

  // Helper function for logout button hover effects
  const handleLogoutMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = "rgba(239, 68, 68, 0.8)"
    e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.8)"
    e.currentTarget.style.transform = "translateY(-1px)"
  }

  const handleLogoutMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"
    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)"
    e.currentTarget.style.transform = "translateY(0)"
  }

  return (
    <header style={styles.navbar} role="banner">
      <div style={styles.navbarInner}>
        <Link to={authed ? "/dashboard" : "/"} style={styles.brand}>
          <div style={styles.brandIcon}>
            <Award size={24} />
          </div>
          AI QuizMaster
        </Link>
        
        <nav style={styles.navlinks} aria-label="Primary">
          {authed ? (
            <>
              <Link
                to="/dashboard"
                aria-current={isActive("/dashboard") ? "page" : undefined}
                style={{
                  ...styles.navLink,
                  ...(isActive("/dashboard") ? styles.navLinkActive : {})
                }}
                onMouseEnter={(e) => handleMouseEnter(e, isActive("/dashboard"))}
                onMouseLeave={(e) => handleMouseLeave(e, isActive("/dashboard"))}
              >
                <Home size={18} style={styles.icon} />
                Dashboard
              </Link>
              
              <Link
                to="/generate"
                aria-current={isActive("/generate") ? "page" : undefined}
                style={{
                  ...styles.navLink,
                  ...(isActive("/generate") ? styles.navLinkActive : {})
                }}
                onMouseEnter={(e) => handleMouseEnter(e, isActive("/generate"))}
                onMouseLeave={(e) => handleMouseLeave(e, isActive("/generate"))}
              >
                <Zap size={18} style={styles.icon} />
                Generate
              </Link>
              
              <Link
                to="/history"
                aria-current={isActive("/history") ? "page" : undefined}
                style={{
                  ...styles.navLink,
                  ...(isActive("/history") ? styles.navLinkActive : {})
                }}
                onMouseEnter={(e) => handleMouseEnter(e, isActive("/history"))}
                onMouseLeave={(e) => handleMouseLeave(e, isActive("/history"))}
              >
                <History size={18} style={styles.icon} />
                History
              </Link>
              
              <button
                onClick={logout}
                style={{...styles.navLink, ...styles.secondaryBtn}}
                onMouseEnter={handleLogoutMouseEnter}
                onMouseLeave={handleLogoutMouseLeave}
              >
                <LogOut size={18} style={styles.icon} />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              aria-current={isActive("/login") ? "page" : undefined}
              style={{...styles.navLink, ...styles.loginBtn}}
              onMouseEnter={handleLoginMouseEnter}
              onMouseLeave={handleLoginMouseLeave}
            >
              <LogIn size={18} style={styles.icon} />
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}