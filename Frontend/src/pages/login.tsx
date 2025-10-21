import LoginForm from "../components/login-form"

export default function LoginPage() {
  return (
    <section className="container" aria-labelledby="login-title">
      <h1 id="login-title" className="brand" style={{ marginBottom: "1rem" }}>
        Welcome back
      </h1>
      <LoginForm />
    </section>
  )
}
