import { Router } from 'express'
import {
  cancelMySubscription,
  createMySubscription,
  getSubscriptions,
  updateSubscription,
} from '../controllers/subscriptionController.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { allowRoles } from '../middleware/roleMiddleware.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = Router()
router.use(requireAuth)
router.get('/mine', allowRoles('customer'), asyncHandler(getSubscriptions))
router.post('/mine', allowRoles('customer'), asyncHandler(createMySubscription))
router.patch('/mine/:id/cancel', allowRoles('customer'), asyncHandler(cancelMySubscription))
router.get('/', allowRoles('admin', 'staff'), asyncHandler(getSubscriptions))
router.patch('/:id', allowRoles('admin', 'staff'), asyncHandler(updateSubscription))

export default router