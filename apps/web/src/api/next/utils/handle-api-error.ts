import { ApiResponse } from '@stocker/core/responses'

export function handleApiError<Body>(error: object, statusCode: number) {
  if ('title' in error && 'message' in error) {
    console.error(`Api error title: ${error.title}`)
    console.error(`Api error message: ${error.message}`)
    return new ApiResponse({
      errorMessage: String(error.message),
      statusCode,
    }) as ApiResponse<Body>
  }

  console.error('OPA')

  return new ApiResponse({
    errorMessage: 'Unknown api error',
    statusCode,
  }) as ApiResponse<Body>
}
