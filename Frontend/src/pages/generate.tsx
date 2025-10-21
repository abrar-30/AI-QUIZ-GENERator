// src/pages/GeneratePage.tsx

import GenerateQuizForm from "../components/generate-quiz-form"
import { Zap } from "lucide-react"

export default function GeneratePage() {
  // Styles for the page container and header
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
    }
  }

  return (
    <>
      <section 
        style={styles.container} 
        className="gen-page-container" 
        aria-labelledby="gen-title"
      >
        {/* Header Section (now lives in the page) */}
        <div style={styles.header}>
          <h1 id="gen-title" style={styles.title} className="gen-page-title">
            <Zap size={32} />
            Generate Your Quiz
          </h1>
          <p style={styles.subtitle} className="gen-page-subtitle">
            Create a personalized quiz with your preferred settings and difficulty level
          </p>
        </div>

        {/* The refactored form component is now
            plugged in *without* its own header. */}
        <GenerateQuizForm />
      </section>

      {/* Mobile styles for the page container */}
      <style>
      {`
        @media (max-width: 768px) {
          .gen-page-container {
            padding: 1rem;
          }
          .gen-page-title {
            font-size: 1.8rem;
            gap: 0.5rem;
          }
          .gen-page-subtitle {
            margin-bottom: 2rem;
          }
        }
      `}
      </style>
    </>
  )
}