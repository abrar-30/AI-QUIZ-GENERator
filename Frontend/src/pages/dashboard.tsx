import { Link } from "react-router-dom"
import { Brain, History, TrendingUp, Award, Users, BookOpen } from "lucide-react"
import React from "react"

export default function DashboardPage() {
  const stats = [
    { label: "Quizzes Taken", value: "24", icon: <BookOpen size={20} /> },
    { label: "Average Score", value: "85%", icon: <TrendingUp size={20} /> },
    { label: "Current Streak", value: "5 days", icon: <Award size={20} /> },
  ]

  const recentActivity = [
    { quiz: "JavaScript Basics", score: "92%", date: "2 hours ago" },
    { quiz: "React Hooks", score: "78%", date: "1 day ago" },
    { quiz: "CSS Fundamentals", score: "88%", date: "2 days ago" },
  ]

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
      marginBottom: "2rem",
      flexWrap: "wrap" as const,
      gap: "1rem"
    },
    welcomeSection: {
      flex: 1
    },
    gradientText: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      fontSize: "2.5rem",
      fontWeight: "700",
      marginBottom: "0.5rem"
    },
    welcomeSubtitle: {
      color: "#6b7280",
      fontSize: "1.1rem",
      margin: 0
    },
    userBadge: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      padding: "1rem",
      background: "white",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      minWidth: "200px"
    },
    avatar: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white"
    },
    userInfo: {
      display: "flex",
      flexDirection: "column" as const
    },
    userName: {
      fontWeight: "bold",
      fontSize: "1rem"
    },
    userLevel: {
      color: "#6b7280",
      fontSize: "0.9rem"
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
    actionsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem",
      marginBottom: "2rem"
    },
    actionCard: {
      background: "white",
      padding: "2rem",
      borderRadius: "16px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column" as const,
      gap: "1.5rem",
      borderTop: "4px solid"
    },
    primaryCard: {
      borderTopColor: "#667eea"
    },
    secondaryCard: {
      borderTopColor: "#764ba2"
    },
    cardIcon: {
      width: "60px",
      height: "60px",
      borderRadius: "12px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white"
    },
    cardContent: {
      flex: 1
    },
    cardTitle: {
      margin: "0 0 1rem 0",
      fontSize: "1.5rem",
      fontWeight: "600",
      color: "#1f2937"
    },
    helper: {
      color: "#6b7280",
      margin: "0 0 1rem 0",
      lineHeight: "1.5"
    },
    featureList: {
      listStyle: "none",
      padding: 0,
      margin: "1rem 0"
    },
    featureItem: {
      padding: "0.25rem 0",
      color: "#6b7280"
    },
    btn: {
      padding: "0.75rem 1.5rem",
      borderRadius: "8px",
      textDecoration: "none",
      fontWeight: "600",
      textAlign: "center" as const,
      transition: "all 0.3s ease",
      border: "none",
      cursor: "pointer",
      display: "block"
    },
    primaryBtn: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white"
    },
    secondaryBtn: {
      background: "transparent",
      color: "#764ba2",
      border: "2px solid #764ba2"
    },
    recentActivity: {
      background: "white",
      padding: "2rem",
      borderRadius: "16px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      marginBottom: "2rem"
    },
    sectionTitle: {
      margin: "0 0 1.5rem 0",
      fontSize: "1.25rem",
      fontWeight: "600",
      color: "#1f2937"
    },
    activityList: {
      display: "flex",
      flexDirection: "column" as const
    },
    activityItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 0",
      borderBottom: "1px solid #e5e7eb"
    },
    activityInfo: {
      display: "flex",
      flexDirection: "column" as const
    },
    quizName: {
      fontWeight: "600",
      color: "#1f2937"
    },
    quizDate: {
      color: "#6b7280",
      fontSize: "0.9rem"
    },
    scoreBadge: {
      padding: "0.5rem 1rem",
      borderRadius: "20px",
      fontWeight: "600",
      color: "white",
      fontSize: "0.875rem"
    },
    projectInfo: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      padding: "2rem",
      borderRadius: "16px"
    },
    featuresGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "1rem",
      marginTop: "1.5rem"
    },
    feature: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem"
    }
  }

  // Helper function to get score color
  const getScoreColor = (score: string) => {
    const numericScore = parseInt(score);
    if (numericScore >= 90) return "#10b981";
    if (numericScore >= 80) return "#f59e0b";
    return "#ef4444";
  }

  return (
    <section style={styles.container} aria-labelledby="dash-title">
      {/* Header Section */}
      <div style={styles.header}>
        <div style={styles.welcomeSection}>
          <h1 id="dash-title" style={styles.gradientText}>
            Welcome Back!
          </h1>
          <p style={styles.welcomeSubtitle}>Ready to challenge your knowledge today?</p>
        </div>
        <div style={styles.userBadge}>
          <div style={styles.avatar}>
            <Users size={24} />
          </div>
          <div style={styles.userInfo}>
            <span style={styles.userName}>Quiz Master</span>
            <span style={styles.userLevel}>Level 3 Explorer</span>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} style={styles.statCard}>
            <div style={styles.statIcon}>{stat.icon}</div>
            <div style={styles.statContent}>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Actions Grid */}
      <div style={styles.actionsGrid}>
        <div style={{...styles.actionCard, ...styles.primaryCard}}>
          <div style={styles.cardIcon}>
            <Brain size={32} />
          </div>
          <div style={styles.cardContent}>
            <h3 style={styles.cardTitle}>Start New Quiz</h3>
            <p style={styles.helper}>
              Generate custom quizzes by subject, topic, and difficulty level
            </p>
            <ul style={styles.featureList}>
              <li style={styles.featureItem}>• Multiple subjects available</li>
              <li style={styles.featureItem}>• Adjustable difficulty</li>
              <li style={styles.featureItem}>• Instant generation</li>
            </ul>
          </div>
          <Link 
            to="/generate" 
            style={{...styles.btn, ...styles.primaryBtn}}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(-2px)';
              target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(0)';
              target.style.boxShadow = 'none';
            }}
          >
            Start Quiz
          </Link>
        </div>
        
        <div style={{...styles.actionCard, ...styles.secondaryCard}}>
          <div style={styles.cardIcon}>
            <History size={32} />
          </div>
          <div style={styles.cardContent}>
            <h3 style={styles.cardTitle}>View History</h3>
            <p style={styles.helper}>
              Review your past quiz attempts and track your progress over time
            </p>
            <ul style={styles.featureList}>
              <li style={styles.featureItem}>• Detailed score breakdowns</li>
              <li style={styles.featureItem}>• Progress tracking</li>
              <li style={styles.featureItem}>• Performance analytics</li>
            </ul>
          </div>
          <Link 
            to="/history" 
            style={{...styles.btn, ...styles.secondaryBtn}}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(-2px)';
              target.style.boxShadow = '0 4px 15px rgba(118, 75, 162, 0.3)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(0)';
              target.style.boxShadow = 'none';
            }}
          >
            View History
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={styles.recentActivity}>
        <h2 style={styles.sectionTitle}>Recent Activity</h2>
        <div style={styles.activityList}>
          {recentActivity.map((activity, index) => (
            <div key={index} style={styles.activityItem}>
              <div style={styles.activityInfo}>
                <div style={styles.quizName}>{activity.quiz}</div>
                <div style={styles.quizDate}>{activity.date}</div>
              </div>
              <div 
                style={{
                  ...styles.scoreBadge,
                  background: getScoreColor(activity.score)
                }}
              >
                {activity.score}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Info */}
      <div style={styles.projectInfo}>
        <h2 style={{...styles.sectionTitle, color: 'white', margin: '0 0 1rem 0'}}>
          About This Quiz App
        </h2>
        <p style={{margin: '0 0 1.5rem 0', lineHeight: '1.6'}}>
          A modern, interactive quiz application built with React and TypeScript. 
          Generate custom quizzes, track your progress, and challenge your knowledge 
          across various subjects and difficulty levels.
        </p>
        <div style={styles.featuresGrid}>
          <div style={styles.feature}>
            <Brain size={16} />
            <span>AI-Powered Generation</span>
          </div>
          <div style={styles.feature}>
            <TrendingUp size={16} />
            <span>Progress Tracking</span>
          </div>
          <div style={styles.feature}>
            <Award size={16} />
            <span>Achievement System</span>
          </div>
          <div style={styles.feature}>
            <Users size={16} />
            <span>User Profiles</span>
          </div>
        </div>
      </div>
    </section>
  )
}