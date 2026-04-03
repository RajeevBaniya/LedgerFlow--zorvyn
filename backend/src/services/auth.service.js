import prismaClientPackage from "@prisma/client"

import prisma from "../config/db.js"
import { createError } from "../utils/error.js"
import { comparePassword, hashPassword } from "../utils/hash.js"
import { generateToken } from "../utils/token.js"

const { Role, UserStatus } = prismaClientPackage

const sanitizeUser = (user) => {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt
  }
}

const signupUser = async (data) => {
  const normalizedEmail = data.email.toLowerCase()

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail }
  })

  if (existingUser) {
    throw createError("Email already in use", 409)
  }

  const hashedPassword = await hashPassword(data.password)

  const createdUser = await prisma.user.create({
    data: {
      email: normalizedEmail,
      password: hashedPassword,
      role: Role.VIEWER
    }
  })

  return sanitizeUser(createdUser)
}

const loginUser = async (data) => {
  const normalizedEmail = data.email.toLowerCase()

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail }
  })

  if (!user) {
    throw createError("Invalid credentials", 401)
  }

  if (user.status !== UserStatus.ACTIVE) {
    throw createError("User is inactive", 403)
  }

  const isPasswordValid = await comparePassword(data.password, user.password)

  if (!isPasswordValid) {
    throw createError("Invalid credentials", 401)
  }

  const tokenPayload = { sub: user.id, role: user.role }
  const token = generateToken(tokenPayload)

  return { token }
}

const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminEmail || !adminPassword) {
    throw createError("ADMIN_EMAIL and ADMIN_PASSWORD are required", 500)
  }

  const normalizedEmail = adminEmail.toLowerCase()

  const existingAdmin = await prisma.user.findFirst({
    where: {
      OR: [{ email: normalizedEmail }, { role: Role.ADMIN }]
    }
  })

  if (existingAdmin) {
    return sanitizeUser(existingAdmin)
  }

  const hashedPassword = await hashPassword(adminPassword)

  const adminUser = await prisma.user.create({
    data: {
      email: normalizedEmail,
      password: hashedPassword,
      role: Role.ADMIN,
      status: UserStatus.ACTIVE
    }
  })

  return sanitizeUser(adminUser)
}

export { loginUser, seedAdmin, signupUser }
