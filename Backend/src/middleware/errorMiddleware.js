import mongoose from 'mongoose'

export function notFoundHandler(request, response) {
  response.status(404).json({ message: `Route not found: ${request.method} ${request.path}` })
}

export function errorHandler(error, request, response, _next) {
  if (Number.isInteger(error?.status) && error.status >= 400 && error.status < 500) {
    return response.status(error.status).json({ message: error.message })
  }
  if (error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.CastError) {
    return response.status(400).json({ message: error.message })
  }
  if (error?.code === 11000) {
    return response.status(409).json({ message: 'A record with this value already exists.' })
  }
  if (error instanceof SyntaxError && 'body' in error) {
    return response.status(400).json({ message: 'Request body must be valid JSON.' })
  }

  console.error(error)
  return response.status(500).json({ message: 'An unexpected server error occurred.' })
}