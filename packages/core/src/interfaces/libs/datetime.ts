import type { DateFormat } from '../../libs/datetime/types'

export interface IDatetime {
  format(dateFormat: DateFormat): string
  addDays(daysCount: number): Date
  subtractDays(daysCount: number): Date
  subtractYears(yearsCount: number): Date
  isGreaterThan(date: Date): boolean
  isLessThan(date: Date): boolean
  isSameOrBefore(date: Date): boolean
  isSameOrAfter(date: Date): boolean
}
