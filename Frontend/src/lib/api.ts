import useSWR, { type SWRConfiguration } from "swr"
import { getToken } from "./token"

const API_URL = import.meta.env.VITE_API_URL 
const QUIZ_BASE = import.meta.env.VITE_API_QUIZ_BASE || "/quiz"

type FetchOptions = RequestInit & { auth?: boolean }

async function apiFetch<T>(path: string, opts: FetchOptions = {}): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" }
  if (opts.headers) {
    if (opts.headers instanceof Headers) {
      opts.headers.forEach((value, key) => {
        headers[key] = value
      })
    } else if (Array.isArray(opts.headers)) {
      for (const [key, value] of opts.headers) headers[key] = value
    } else {
      Object.assign(headers, opts.headers as Record<string, string>)
    }
  }
  if (opts.auth !== false) {
    const token = getToken()
    if (token) headers["Authorization"] = `Bearer ${token}`
  }
  const url = `${API_URL}${path}`
  const res = await fetch(url, { ...opts, headers })
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    const method = (opts.method || "GET").toString().toUpperCase()
    const message = `HTTP ${res.status} ${res.statusText} for ${method} ${url}${text ? ` - ${text}` : ""}`
    console.error("API error:", { method, url, status: res.status, statusText: res.statusText, body: text })
    throw new Error(message)
  }
  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

// Auth
export async function login(username: string, password: string) {
  // Adjust endpoint/body to match your API spec
  return apiFetch<{ token: string; user?: any }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    auth: false,
  })
}

// Quiz generation
export async function createQuiz(payload: {
  grade: string
  subject: string
  totalQuestions: number
  maxScore: number
  difficulty: "EASY" | "MEDIUM" | "HARD"
}) {
  return apiFetch<{ quizId: string }>(`${QUIZ_BASE}/generate`, {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

// (removed GET /:id variant; backend doesn't support it)

// Submit quiz
export async function submitQuiz(
  quizId: string,
  responses: Array<{ questionId: string; userResponse: string }>,
) {
  return apiFetch<any>(`${QUIZ_BASE}/submit`, {
    method: "POST",
    body: JSON.stringify({ quizId, responses }),
  })
}

// History
export function useHistory(
  params?: {
    subject?: string
    from?: string
    to?: string
    grade?: string
    minScore?: string
    maxScore?: string
    minAttempt?: string
    maxAttempt?: string
  },
  config?: SWRConfiguration,
) {
  const qs = new URLSearchParams()
  if (params?.subject) qs.set("subject", params.subject)
  if (params?.from) qs.set("from", params.from)
  if (params?.to) qs.set("to", params.to)
  if (params?.grade) qs.set("grade", params.grade)
  if (params?.minScore) qs.set("minScore", params.minScore)
  if (params?.maxScore) qs.set("maxScore", params.maxScore)
  if (params?.minAttempt) qs.set("minAttempt", params.minAttempt)
  if (params?.maxAttempt) qs.set("maxAttempt", params.maxAttempt)
  const key = `${QUIZ_BASE}/history${qs.toString() ? `?${qs}` : ""}`
  const fetcher = () => apiFetch<any>(key)
  return useSWR(["history", qs.toString()], fetcher, config)
}

// Retry quiz
export async function retryQuiz(quizId: string) {
  return apiFetch<{ quizId: string }>(`${QUIZ_BASE}/retry`, {
    method: "POST",
    body: JSON.stringify({ quizId }),
  })
}

// Send result
export async function sendResult(submissionId: string, recipientEmail: string) {
  return apiFetch<void>(`${QUIZ_BASE}/send-result`, {
    method: "POST",
    body: JSON.stringify({ submissionId, email: recipientEmail }),
  })
}

// Get hint for a specific question
export async function getHint(quizId: string, questionId: string) {
  return apiFetch<{ hint: string }>(`${QUIZ_BASE}/hint`, {
    method: "POST",
    body: JSON.stringify({ quizId, questionId }),
  })
}

// Load quiz details via retry endpoint (backend has no GET /:id)
export function useQuiz(quizId?: string, config?: SWRConfiguration) {
  const shouldFetch = !!quizId
  const fetcher = () =>
    apiFetch<any>(`${QUIZ_BASE}/retry`, {
      method: "POST",
      body: JSON.stringify({ quizId }),
    })
  return useSWR(shouldFetch ? ["quiz", quizId] : null, fetcher, config)
}

export const swrConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  shouldRetryOnError: false,
}
