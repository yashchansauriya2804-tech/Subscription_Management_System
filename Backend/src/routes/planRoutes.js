import { Router } from 'express'
import { createPlan, deletePlan, getPlans, updatePlan } from '../controllers/planController.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { allowRoles } from '../middleware/roleMiddleware.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = Router()
router.use(requireAuth)
router.get('/', asyncHandler(getPlans))
router.post('/', allowRoles('admin'), asyncHandler(createPlan))
router.patch('/:id', allowRoles('admin'), asyncHandler(updatePlan))
router.delete('/:id', allowRoles('admin'), asyncHandler(deletePlan))

export default router