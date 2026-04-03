import {
  getAllUsers as getAllUsersService,
  updateUserRole as updateUserRoleService,
  updateUserStatus as updateUserStatusService
} from "../services/user.service.js"

const getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService()

    return res.status(200).json({
      success: true,
      data: {
        users
      }
    })
  } catch (error) {
    return next(error)
  }
}

const updateRole = async (req, res, next) => {
  try {
    const actorUserId = req.user.id
    const targetUserId = req.validatedParams.id
    const user = await updateUserRoleService(actorUserId, targetUserId, req.body.role)

    return res.status(200).json({
      success: true,
      data: {
        user
      }
    })
  } catch (error) {
    return next(error)
  }
}

const updateStatus = async (req, res, next) => {
  try {
    const targetUserId = req.validatedParams.id
    const user = await updateUserStatusService(targetUserId, req.body.status)

    return res.status(200).json({
      success: true,
      data: {
        user
      }
    })
  } catch (error) {
    return next(error)
  }
}

export { getUsers, updateRole, updateStatus }
