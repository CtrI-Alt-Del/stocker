export function addUrlParams(url: string, params: Record<string, string>) {
  if (!Object.values(params).length) return url

  const urlParams: string[] = []

  for (const [key, value] of Object.entries(params)) {
    urlParams.push(`${key}=${value}`)
  }

  return `${url}?${urlParams.join('&')}`
}
