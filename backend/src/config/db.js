import prismaClientPackage from "@prisma/client"

const { PrismaClient } = prismaClientPackage

const globalForPrisma = globalThis

const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}

export default prisma
