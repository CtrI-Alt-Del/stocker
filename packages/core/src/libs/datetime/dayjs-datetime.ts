import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export class DayjsDatetime {
  now(): Date {
    return dayjs().toDate()
  }
}
