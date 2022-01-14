import { formatLocaleDateDK } from './dateUtils'

export const formatDatesReturnState = (dateObject, payload) => {
  return payload.map((item) => {
    const dateValue = item[dateObject]
    const formattedDate = formatLocaleDateDK(dateValue)
    item[dateObject] = formattedDate 

    return { ...item }
  })
}