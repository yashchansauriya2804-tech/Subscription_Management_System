import { Router } from 'express'
import {
  createPayment,
  getMyPaymentMethods,
  getPayments,
} from '../controllers/paymentController.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { allowRoles } from '../middleware/roleMiddleware.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = Router()
router.use(requireAuth)
router.get('/mine', allowRoles('customer'), asyncHandler(getMyPaymentMethods))
router.get('/', allowRoles('admin', 'staff'), asyncHandler(getPayments))
router.post('/', allowRoles('admin', 'staff'), asyncHandler(createPayment))

export default router