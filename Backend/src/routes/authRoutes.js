import { Router } from 'express'
import { currentUser, forgotPassword, login, register } from '../controllers/authController.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = Router()
router.post('/register', asyncHandler(register))
router.post('/login', asyncHandler(login))
router.post('/forgot-password', forgotPassword)
router.get('/me', requireAuth, currentUser)

export default router