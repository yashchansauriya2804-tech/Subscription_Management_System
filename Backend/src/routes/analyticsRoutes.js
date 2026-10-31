import { Router } from 'express'
import { overview, revenueTrend } from '../controllers/analyticsController.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { allowRoles } from '../middleware/roleMiddleware.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = Router()
router.use(requireAuth, allowRoles('admin'))
router.get('/overview', asyncHandler(overview))
router.get('/revenue-trend', asyncHandler(revenueTrend))

export default router