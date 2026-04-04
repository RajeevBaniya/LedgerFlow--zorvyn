import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { postSignup } from "../api/auth.js"
import AuthBranding from "../components/common/AuthBranding.jsx"
import { useAuth } from "../hooks/useAuth.js"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { user, token, isAuthReady } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthReady) {
      return
    }

    if (token && user) {
      const target = user.role === "ADMIN" ? "/admin" : "/dashboard"
      navigate(target, { replace: true })
    }
  }, [isAuthReady, token, user, navigate])

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage("")

    setIsSubmitting(true)

    try {
      await postSignup({ email, password })
      navigate("/login", { replace: true })
    } catch (error) {
      const message =
        error.response?.data?.message ?? error.message ?? "Signup failed"
      setErrorMessage(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="h-full min-h-0 overflow-y-auto">
      <div className="flex min-h-full w-full items-center justify-center px-4 py-8 sm:px-6 sm:py-10">
        <form
          onSubmit={handleSubmit}
          className="auth-card space-y-4 px-5 py-7 sm:px-8 sm:py-8"
        >
          <AuthBranding />
          <h1 className="text-lg font-semibold text-finance-light">Create account</h1>

          {errorMessage ? (
            <p className="text-sm text-finance-danger" role="alert">
              {errorMessage}
            </p>
          ) : null}

          <div className="space-y-1">
            <label htmlFor="signup-email" className="auth-label">
              Email
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="auth-input"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="signup-password" className="auth-label">
              Password
            </label>
            <input
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={handlePasswordChange}
              required
              minLength={6}
              className="auth-input"
            />
            <p className="text-xs text-finance-secondary">At least 6 characters</p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="min-h-[44px] w-full rounded-lg bg-finance-primary py-2.5 text-white transition-all duration-200 hover:bg-finance-hover disabled:opacity-50"
          >
            {isSubmitting ? "Creating account…" : "Sign up"}
          </button>

          <p className="text-center text-sm text-finance-secondary">
            <Link
              to="/login"
              className="font-medium text-sky-400 hover:text-sky-300 hover:underline"
            >
              Already have an account? Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup
