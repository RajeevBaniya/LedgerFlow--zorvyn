import { loginUser, signupUser } from "../services/auth.service.js"

const signup = async (req, res, next) => {
  try {
    const user = await signupUser(req.body)
    return res.status(201).json({
      message: "User created successfully",
      user
    })
  } catch (error) {
    return next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { token } = await loginUser(req.body)
    return res.status(200).json({
      message: "Login successful",
      token
    })
  } catch (error) {
    return next(error)
  }
}

export { login, signup }
