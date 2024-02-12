import moment, { Moment } from 'moment'

export const DataHelper = {
  currencyFormatter: (value: number): string => {
    const formatter = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    })
    return formatter.format(value)
  },
  date: (value: string): moment.Moment => {
    return moment(value, 'YYYY/MM/DD')
  }
}
