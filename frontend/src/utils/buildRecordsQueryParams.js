import { endOfDayIso, startOfDayIso } from "./recordDates.js"

const buildRecordsQueryParams = ({
  page,
  limit,
  search,
  typeFilter,
  categoryFilter,
  startDate,
  endDate
}) => {
  const params = {
    page,
    limit
  }

  const trimmedSearch = search.trim()

  if (trimmedSearch) {
    params.search = trimmedSearch
  }

  if (typeFilter === "INCOME" || typeFilter === "EXPENSE") {
    params.type = typeFilter
  }

  const trimmedCategory = categoryFilter.trim()

  if (trimmedCategory) {
    params.category = trimmedCategory
  }

  const startIso = startOfDayIso(startDate)

  if (startIso) {
    params.startDate = startIso
  }

  const endIso = endOfDayIso(endDate)

  if (endIso) {
    params.endDate = endIso
  }

  return params
}

export { buildRecordsQueryParams }
