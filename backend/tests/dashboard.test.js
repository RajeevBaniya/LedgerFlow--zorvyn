import request from "supertest"
import { beforeAll, describe, expect, it } from "vitest"

import createApp from "../src/app.js"

const app = createApp()

function requireAdminEnv() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  if (!email || !password) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD for integration tests")
  }
  return { email, password }
}

describe("dashboard", () => {
  let token

  beforeAll(async () => {
    const { email, password } = requireAdminEnv()
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email, password })
    expect(loginRes.status).toBe(200)
    token = loginRes.body.data.token
  })

  it("GET /api/dashboard/summary returns 200", async () => {
    const res = await request(app)
      .get("/api/dashboard/summary")
      .set("Authorization", `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
  })

  it("GET /api/dashboard/trends returns 200", async () => {
    const res = await request(app)
      .get("/api/dashboard/trends")
      .set("Authorization", `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
  })
})
