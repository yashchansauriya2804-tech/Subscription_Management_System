import { Router } from 'express'
import {
  createCustomer,
  deactivateCustomer,
  getCustomer,
  getMyProfile,
  listCustomers,
  updateCustomer,
  updateMyProfile,
} from '../controllers/customerController.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { allowRoles } from '../middleware/roleMiddleware.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = Router()
const staff = allowRoles('admin', 'staff')

router.use(requireAuth)
router.get('/me', allowRoles('customer'), asyncHandler(getMyProfile))
router.patch('/me', allowRoles('customer'), asyncHandler(updateMyProfile))
router.get('/', staff, asyncHandler(listCustomers))
router.post('/', allowRoles('admin'), asyncHandler(createCustomer))
router.get('/:id', staff, asyncHandler(getCustomer))
router.patch('/:id', allowRoles('admin'), asyncHandler(updateCustomer))
router.delete('/:id', allowRoles('admin'), asyncHandler(deactivateCustomer))

export default router