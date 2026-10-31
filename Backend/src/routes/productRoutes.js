import { Router } from 'express'
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from '../controllers/productController.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { allowRoles } from '../middleware/roleMiddleware.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = Router()
router.use(requireAuth, allowRoles('admin', 'staff'))
router.route('/')
  .get(asyncHandler(getProducts))
  .post(allowRoles('admin'), asyncHandler(createProduct))
router.patch('/:id', allowRoles('admin'), asyncHandler(updateProduct))
router.delete('/:id', allowRoles('admin'), asyncHandler(deleteProduct))

export default router