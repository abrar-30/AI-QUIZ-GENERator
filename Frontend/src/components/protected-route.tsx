import type { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { getToken } from "../lib/token"

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = getToken()
  const loc = useLocation()
  if (!token) return <Navigate to="/login" state={{ from: loc }} replace />
  return <>{children}</>
}
