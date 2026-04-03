import {
  createRecord as createRecordService,
  deleteRecord as deleteRecordService,
  getRecords as getRecordsService,
  updateRecord as updateRecordService
} from "../services/record.service.js"

const createRecord = async (req, res, next) => {
  try {
    const userId = req.user.id
    const record = await createRecordService(userId, req.body)

    return res.status(201).json({
      success: true,
      data: {
        record
      }
    })
  } catch (error) {
    return next(error)
  }
}

const getRecords = async (req, res, next) => {
  try {
    const userId = req.user.id
    const response = await getRecordsService(userId, req.validatedQuery)

    return res.status(200).json({
      success: true,
      data: response.data,
      meta: response.meta
    })
  } catch (error) {
    return next(error)
  }
}

const updateRecord = async (req, res, next) => {
  try {
    const userId = req.user.id
    const recordId = req.validatedParams.id
    const record = await updateRecordService(userId, recordId, req.body)

    return res.status(200).json({
      success: true,
      data: {
        record
      }
    })
  } catch (error) {
    return next(error)
  }
}

const deleteRecord = async (req, res, next) => {
  try {
    const userId = req.user.id
    const recordId = req.validatedParams.id

    await deleteRecordService(userId, recordId)

    return res.status(200).json({
      success: true,
      data: {
        message: "Record deleted successfully"
      }
    })
  } catch (error) {
    return next(error)
  }
}

export { createRecord, deleteRecord, getRecords, updateRecord }
