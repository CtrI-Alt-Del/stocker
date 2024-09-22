import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import type { DateFormat } from '../types'
import type { IDatetime } from '../../../interfaces'

dayjs.extend(utc)

export class DayjsDatetime implements IDatetime {
  private date: dayjs.Dayjs

  constructor(date: Date) {
    this.date = dayjs(date)
  }

  format(dateFormat: DateFormat): string {
    return this.date.format(dateFormat)
  }

  addDays(daysCount: number): Date {
    return this.date.add(daysCount, 'day').toDate()
  }
}
