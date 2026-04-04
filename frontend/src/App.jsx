import React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import ProtectedRoute from "./components/common/auth/ProtectedRoute.jsx"
import RoleRoute from "./components/common/auth/RoleRoute.jsx"
import Layout from "./components/layout/Layout.jsx"
import { AuthProvider } from "./context/AuthContext.jsx"
import Admin from "./pages/Admin.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Login from "./pages/Login.jsx"
import Records from "./pages/Records.jsx"
import Signup from "./pages/Signup.jsx"

const App = () => {
  return (
    <BrowserRouter>
      <div className="h-full min-h-0">
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/records"
              element={
                <ProtectedRoute>
                  <RoleRoute allowedRoles={["ADMIN", "ANALYST"]}>
                    <Layout>
                      <Records />
                    </Layout>
                  </RoleRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <RoleRoute allowedRoles={["ADMIN"]}>
                    <Layout>
                      <Admin />
                    </Layout>
                  </RoleRoute>
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </AuthProvider>
      </div>
    </BrowserRouter>
  )
}

export default App
