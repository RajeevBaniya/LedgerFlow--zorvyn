import request from "supertest"
import { describe, expect, it } from "vitest"

import createApp from "../src/app.js"

const app = createApp()

describe("auth", () => {
  it("signup returns 201", async () => {
    const email = `t-${Date.now()}-${Math.random().toString(36).slice(2, 9)}@test.example.com`
    const res = await request(app)
      .post("/api/auth/signup")
      .send({ email, password: "secret12" })

    expect(res.status).toBe(201)
    expect(res.body.success).toBe(true)
    expect(res.body.data.user).toBeDefined()
  })

  it("login returns 200 and token", async () => {
    const email = `t-login-${Date.now()}@test.example.com`
    await request(app)
      .post("/api/auth/signup")
      .send({ email, password: "secret12" })

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email, password: "secret12" })

    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(typeof res.body.data.token).toBe("string")
    expect(res.body.data.token.length).toBeGreaterThan(0)
  })
})
