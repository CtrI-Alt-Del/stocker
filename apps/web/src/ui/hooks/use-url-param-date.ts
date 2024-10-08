import { Datetime } from '@stocker/core/libs'
import { parseAsString, useQueryState } from 'nuqs'

export function useUrlParamDate(
  key: string,
  defaultDate: Date,
): [Date, (newDate: Date) => void] {
  const [date, setdate] = useQueryState(key, parseAsString)

  function setState(newDate: Date) {
    setdate(new Datetime(newDate).format('YYYY-MM-DD'))
  }

  return [date ? new Date(date) : defaultDate, setState]
}
