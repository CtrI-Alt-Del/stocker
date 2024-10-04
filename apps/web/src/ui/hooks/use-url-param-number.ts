import { parseAsInteger, useQueryState } from 'nuqs'

export function useUrlParamNumber(
  key: string,
  defeaulNumber = 0,
): [number, (newValue: number) => void] {
  const [number, setNumber] = useQueryState(key, parseAsInteger)

  function setState(newnumber: number) {
    setNumber(newnumber)
  }

  return [number ?? defeaulNumber, setState]
}
