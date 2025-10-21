import GenerateQuizForm from "../components/generate-quiz-form"

export default function GeneratePage() {
  return (
    <section className="container" aria-labelledby="gen-title">
      <h1 id="gen-title" className="brand" style={{ marginBottom: "1rem" }}>
        Generate Quiz
      </h1>
      <GenerateQuizForm />
    </section>
  )
}
