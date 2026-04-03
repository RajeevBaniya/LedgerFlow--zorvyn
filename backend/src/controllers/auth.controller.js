import { loginUser, signupUser } from "../services/auth.service.js"

const me = (req, res) => {
  return res.status(200).json({
    success: true,
    data: {
      id: req.user.id,
      role: req.user.role
    }
  })
}

const signup = async (req, res, next) => {
  try {
    const user = await signupUser(req.body)
    return res.status(201).json({
      success: true,
      data: {
        user
      }
    })
  } catch (error) {
    return next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { token } = await loginUser(req.body)
    return res.status(200).json({
      success: true,
      data: {
        token
      }
    })
  } catch (error) {
    return next(error)
  }
}

export { login, me, signup }
