const activeRecordsWhere = (userId) => {
  return {
    userId,
    deletedAt: null
  }
}

export { activeRecordsWhere }
