import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import type { DateFormat } from '../types'
import type { IDatetime } from '../../../interfaces'

dayjs.extend(utc)

export class DayjsDatetime implements IDatetime {
  private date: dayjs.Dayjs

  constructor(date: Date = new Date()) {
    this.date = dayjs(date)
  }

  format(dateFormat: DateFormat): string {
    return this.date.format(dateFormat)
  }

  addDays(daysCount: number): Date {
    return this.date.add(daysCount, 'day').toDate()
  }

  subtractDays(daysCount: number): Date {
    return this.date.subtract(daysCount, 'day').toDate()
  }
  subtractYears(yearsCount: number): Date {
    return this.date.subtract(yearsCount, 'years').toDate()
  }

  isSameOrBefore(date: Date): boolean {
    return this.date.isSame(date) || this.date.isBefore(date)
  }

  isSameOrAfter(date: Date): boolean {
    return this.date.isSame(date) || this.date.isAfter(date)
  }

  isGreaterThan(date: Date): boolean {
    return this.date.isAfter(date)
  }

  isLessThan(date: Date): boolean {
    return this.date.isBefore(date)
  }

  differenceInDays(date: Date): number {
    return this.date.diff(date, 'days')
  }

  differenceInMonths(date: Date): number {
    return this.date.diff(date, 'months')
  }

  differenceInYears(date: Date): number {
    return this.date.diff(date, 'years')
  }

  getDate(): Date {
    return this.date.toDate()
  }
}
