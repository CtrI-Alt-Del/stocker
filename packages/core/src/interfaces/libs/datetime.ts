import type { DateFormat } from '../../libs/datetime/types'

export interface IDatetime {
  format(dateFormat: DateFormat): string
  addDays(daysCount: number): Date
  addMonths(monthssCount: number): Date
  addYears(yearsCount: number): Date
  subtractDays(daysCount: number): Date
  subtractMonths(monthsCount: number): Date
  subtractYears(yearsCount: number): Date
  isGreaterThan(date: Date): boolean
  isLessThan(date: Date): boolean
  isSameOrBefore(date: Date): boolean
  isSameOrAfter(date: Date): boolean
  isBetween(startDate: Date, endDate: Date): boolean
  differenceInDays(date: Date): number
  differenceInMonths(date: Date): number
  differenceInYears(date: Date): number
  getDate(): Date
}
