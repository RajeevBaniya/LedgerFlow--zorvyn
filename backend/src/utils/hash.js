import bcrypt from "bcrypt"

const SALT_ROUNDS = 10

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

  return hashedPassword
}

const comparePassword = async (password, hashedPassword) => {
  const isPasswordValid = await bcrypt.compare(password, hashedPassword)

  return isPasswordValid
}

export { hashPassword, comparePassword }
