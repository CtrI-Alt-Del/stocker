import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import type { DateFormat } from '../types'
import type { IDatetime } from '../../../interfaces'

dayjs.extend(utc)

export class DayjsDatetime implements IDatetime {
  now(): Date {
    return dayjs().toDate()
  }

  format(date: Date, dateFormat: DateFormat): string {
    return dayjs(date).format(dateFormat)
  }

  addDays(date: Date, daysCount: number): Date {
    return dayjs(date).add(daysCount, 'day').toDate()
  }
}
