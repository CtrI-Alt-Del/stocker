import type { DateFormat } from '../../libs/datetime/types'

export interface IDatetime {
  now(): Date
  format(date: Date, dateFormat: DateFormat): string
  addDays(date: Date, daysCount: number): Date
}
