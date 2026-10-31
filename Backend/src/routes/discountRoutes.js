import { Router } from 'express'
import {
  createDiscount,
  deleteDiscount,
  getDiscounts,
  updateDiscount,
} from '../controllers/discountController.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { allowRoles } from '../middleware/roleMiddleware.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = Router()
router.use(requireAuth, allowRoles('admin'))
router.route('/')
  .get(asyncHandler(getDiscounts))
  .post(asyncHandler(createDiscount))
router.route('/:id')
  .patch(asyncHandler(updateDiscount))
  .delete(asyncHandler(deleteDiscount))

export default router