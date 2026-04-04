import request from "supertest"
import { describe, expect, it } from "vitest"

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

async function loginAdmin() {
  const { email, password } = requireAdminEnv()
  const res = await request(app).post("/api/auth/login").send({ email, password })
  expect(res.status).toBe(200)
  return res.body.data.token
}

describe("records", () => {
  it("GET /api/records without token returns 401", async () => {
    const res = await request(app).get("/api/records")
    expect(res.status).toBe(401)
  })

  it("ADMIN can create record and list records", async () => {
    const token = await loginAdmin()
    const date = new Date().toISOString()

    const createRes = await request(app)
      .post("/api/records")
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: "99.99",
        type: "INCOME",
        category: "IntegrationTest",
        date,
        note: "vitest"
      })

    expect(createRes.status).toBe(201)
    expect(createRes.body.success).toBe(true)

    const listRes = await request(app)
      .get("/api/records")
      .set("Authorization", `Bearer ${token}`)

    expect(listRes.status).toBe(200)
    expect(listRes.body.success).toBe(true)
  })
})
