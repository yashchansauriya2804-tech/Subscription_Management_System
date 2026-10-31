import { Router } from 'express'
import { previewQuotation } from '../controllers/quotationController.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = Router()
router.use(requireAuth)
router.post('/preview', asyncHandler(previewQuotation))

export default router
