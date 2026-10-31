import { Router } from 'express'
import { createStaff, deactivateStaff, listStaff } from '../controllers/staffController.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { allowRoles } from '../middleware/roleMiddleware.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = Router()
router.use(requireAuth, allowRoles('admin'))
router.route('/')
  .get(asyncHandler(listStaff))
  .post(asyncHandler(createStaff))
router.delete('/:id', asyncHandler(deactivateStaff))

export default router
