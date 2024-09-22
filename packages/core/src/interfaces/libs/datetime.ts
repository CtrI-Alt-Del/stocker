import type { DateFormat } from '../../libs/datetime/types'

export interface IDatetime {
  format(dateFormat: DateFormat): string
  addDays(daysCount: number): Date
}
