export const getDateForOver18 = (): string => {
  const dtToday = new Date()
  let month: any = dtToday.getMonth() + 1
  let day: any = dtToday.getDate()
  const year = dtToday.getFullYear() - 18
  if (month < 10) { month = `0${month.toString()}` }
  if (day < 10) { day = `0${day.toString()}` }
  return `${year}-${month}-${day}`
}
