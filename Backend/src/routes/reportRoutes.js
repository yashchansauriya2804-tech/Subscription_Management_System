import { Router } from 'express'
import { overview, revenueTrend, staffOverview } from '../controllers/reportController.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { allowRoles } from '../middleware/roleMiddleware.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = Router()
router.use(requireAuth)
router.get('/overview', allowRoles('admin'), asyncHandler(overview))
router.get('/revenue-trend', allowRoles('admin'), asyncHandler(revenueTrend))
router.get('/staff-overview', allowRoles('admin', 'staff'), asyncHandler(staffOverview))

export default router