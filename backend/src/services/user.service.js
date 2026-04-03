import prismaClientPackage from "@prisma/client"

import prisma from "../config/db.js"
import { createError } from "../utils/error.js"

const { Role } = prismaClientPackage

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      createdAt: true
    }
  })

  return users
}

const updateUserRole = async (actorUserId, targetUserId, role) => {
  const targetUser = await prisma.user.findUnique({
    where: { id: targetUserId }
  })

  if (!targetUser) {
    throw createError("User not found", 404)
  }

  if (actorUserId === targetUserId && targetUser.role === Role.ADMIN && role !== Role.ADMIN) {
    throw createError("Cannot change own role from ADMIN", 400)
  }

  const updatedUser = await prisma.user.update({
    where: { id: targetUserId },
    data: { role },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      createdAt: true
    }
  })

  return updatedUser
}

const updateUserStatus = async (targetUserId, status) => {
  const targetUser = await prisma.user.findUnique({
    where: { id: targetUserId }
  })

  if (!targetUser) {
    throw createError("User not found", 404)
  }

  const updatedUser = await prisma.user.update({
    where: { id: targetUserId },
    data: { status },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      createdAt: true
    }
  })

  return updatedUser
}

export { getAllUsers, updateUserRole, updateUserStatus }
