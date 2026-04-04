import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { postLogin } from "../api/auth.js"
import AuthBranding from "../components/common/AuthBranding.jsx"
import { useAuth } from "../hooks/useAuth.js"
import { decodeJwtPayload } from "../utils/jwtDecode.js"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { login, user, token, isAuthReady } = useAuth()
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
      const response = await postLogin({ email, password })
      const newToken = response.data?.data?.token

      if (!newToken) {
        setErrorMessage("Login failed")
        return
      }

      login(newToken)

      const payload = decodeJwtPayload(newToken)
      const role = payload?.role

      if (role === "ADMIN") {
        navigate("/admin", { replace: true })
      } else {
        navigate("/dashboard", { replace: true })
      }
    } catch (error) {
      const message =
        error.response?.data?.message ?? error.message ?? "Login failed"
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
          <h1 className="text-lg font-semibold text-finance-light">Sign in</h1>

          {errorMessage ? (
            <p className="text-sm text-finance-danger" role="alert">
              {errorMessage}
            </p>
          ) : null}

          <div className="space-y-1">
            <label htmlFor="email" className="auth-label">
              Email
            </label>
            <input
              id="email"
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
            <label htmlFor="password" className="auth-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="auth-input"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="min-h-[44px] w-full rounded-lg bg-finance-primary py-2.5 text-white transition-all duration-200 hover:bg-finance-hover disabled:opacity-50"
          >
            {isSubmitting ? "Signing in…" : "Sign in"}
          </button>

          <p className="text-center text-sm text-finance-secondary">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-sky-400 hover:text-sky-300 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
