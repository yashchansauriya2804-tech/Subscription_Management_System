import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import { asyncHandler } from './asyncHandler.js'

export const requireAuth = asyncHandler(async (request, response, next) => {
  const authorization = request.get('authorization')
  const token = authorization?.startsWith('Bearer ') ? authorization.slice(7) : null

  if (!token) {
    response.status(401).json({ message: 'Authentication is required.' })
    return
  }

  let payload
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      response.status(401).json({ message: 'Your session has expired. Please sign in again.' })
      return
    }
    throw error
  }

  const user = await User.findById(payload.sub).select('_id name email role active')
  if (!user || !user.active) {
    response.status(401).json({ message: 'This account is unavailable.' })
    return
  }

  request.user = user
  next()
})