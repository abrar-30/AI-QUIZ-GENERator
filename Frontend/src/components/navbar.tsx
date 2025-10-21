import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { clearToken, getToken } from "../lib/token"
import { Home, Zap, History, LogOut, LogIn, Award, Menu, X } from "lucide-react"

export function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const authed = !!getToken()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function logout() {
    clearToken()
    setIsMobileMenuOpen(false) // Close menu on logout
    navigate("/login", { replace: true })
  }

  // Helper function to determine if link is active
  const isActive = (path: string) => pathname === path

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Close menu when a link is clicked
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  // All inline styles and hover-handler functions have been removed
  // They are now handled by CSS classes in the <style> block below

  return (
    <>
      <header className="navbar" role="banner">
        <div className="navbar-inner">
          <Link 
            to={authed ? "/dashboard" : "/"} 
            className="navbar-brand"
            onClick={handleMobileLinkClick} // Close menu if brand is clicked
          >
            <div className="navbar-brand-icon">
              <Award size={24} />
            </div>
            Quiz Ai
          </Link>
          
          {/* --- Desktop Navigation --- */}
          <nav className="navbar-links-desktop" aria-label="Primary">
            {authed ? (
              <>
                <Link
                  to="/dashboard"
                  aria-current={isActive("/dashboard") ? "page" : undefined}
                  className={`navbar-link ${isActive("/dashboard") ? "active" : ""}`}
                >
                  <Home size={18} />
                  Dashboard
                </Link>
                
                <Link
                  to="/generate"
                  aria-current={isActive("/generate") ? "page" : undefined}
                  className={`navbar-link ${isActive("/generate") ? "active" : ""}`}
                >
                  <Zap size={18} />
                  Generate
                </Link>
                
                <Link
                  to="/history"
                  aria-current={isActive("/history") ? "page" : undefined}
                  className={`navbar-link ${isActive("/history") ? "active" : ""}`}
                >
                  <History size={18} />
                  History
                </Link>
                
                <button
                  onClick={logout}
                  className="navbar-link btn-logout"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                aria-current={isActive("/login") ? "page" : undefined}
                className="navbar-link btn-login"
              >
                <LogIn size={18} />
                Login
              </Link>
            )}
          </nav>

          {/* --- Mobile Menu Toggle Button --- */}
          <button 
            className="navbar-mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* --- Mobile Navigation Menu (Drawer) --- */}
        <nav 
          className={`navbar-links-mobile ${isMobileMenuOpen ? "open" : ""}`}
          aria-label="Primary mobile"
        >
          {authed ? (
            <>
              <Link
                to="/dashboard"
                aria-current={isActive("/dashboard") ? "page" : undefined}
                className={`navbar-link ${isActive("/dashboard") ? "active" : ""}`}
                onClick={handleMobileLinkClick}
              >
                <Home size={18} />
                Dashboard
              </Link>
              
              <Link
                to="/generate"
                aria-current={isActive("/generate") ? "page" : undefined}
                className={`navbar-link ${isActive("/generate") ? "active" : ""}`}
                onClick={handleMobileLinkClick}
              >
                <Zap size={18} />
                Generate
              </Link>
              
              <Link
                to="/history"
                aria-current={isActive("/history") ? "page" : undefined}
                className={`navbar-link ${isActive("/history") ? "active" : ""}`}
                onClick={handleMobileLinkClick}
              >
                <History size={18} />
                History
              </Link>
              
              <button
                onClick={logout} // Already closes menu
                className="navbar-link btn-logout"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              aria-current={isActive("/login") ? "page" : undefined}
              className="navbar-link btn-login"
              onClick={handleMobileLinkClick}
            >
              <LogIn size={18} />
              Login
            </Link>
          )}
        </nav>
      </header>
      
      {/* --- Styles --- */}
      <style>
      {`
        .navbar {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 0 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
          border-bottom: 3px solid rgba(255, 255, 255, 0.1);
        }

        .navbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 70px;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          text-decoration: none;
        }

        .navbar-brand-icon {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .navbar-links-desktop {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .navbar-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          cursor: pointer;
          background: transparent;
          color: white;
          white-space: nowrap;
        }

        .navbar-link.active {
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        /* Hover effect for non-active links */
        .navbar-link:not(.active):hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-1px);
        }
        
        /* Login Button */
        .btn-login {
          background: white;
          color: #667eea;
          border-color: white;
        }
        .btn-login:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
        }
        
        /* Logout Button */
        .btn-logout {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }
        .btn-logout:hover {
          background: rgba(239, 68, 68, 0.8);
          border-color: rgba(239, 68, 68, 0.8);
          transform: translateY(-1px);
        }

        /* --- Mobile Styles --- */
        .navbar-mobile-toggle {
          display: none; /* Hidden on desktop */
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 6px;
          transition: background 0.2s ease;
        }
        .navbar-mobile-toggle:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .navbar-links-mobile {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: absolute;
          top: 70px; /* Navbar height */
          left: 0;
          width: 100%;
          padding: 0 1.5rem; /* No top/bottom padding when closed */
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          
          /* Animation: closed state */
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out, padding 0.3s ease-out;
        }

        .navbar-links-mobile.open {
          /* Animation: open state */
          max-height: 500px; /* Arbitrary large height */
          padding: 1.5rem;
          transition: max-height 0.3s ease-in, padding 0.3s ease-in;
        }
        
        .navbar-links-mobile .navbar-link {
          /* Make mobile links full-width */
          justify-content: center;
          padding: 1rem;
          font-size: 1rem;
          background: rgba(255, 255, 255, 0.05);
        }

        @media (max-width: 768px) {
          .navbar {
            padding: 0 1rem; /* Reduce padding on mobile */
          }
        
          .navbar-links-desktop {
            display: none; /* Hide desktop links */
          }
          
          .navbar-mobile-toggle {
            display: flex; /* Show hamburger button */
          }
        }
      `}
      </style>
    </>
  )
}