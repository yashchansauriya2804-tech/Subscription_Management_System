import { Router } from 'express'
import {
  createInvoice,
  deleteInvoice,
  getInvoices,
  updateInvoice,
} from '../controllers/invoiceController.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { allowRoles } from '../middleware/roleMiddleware.js'
import { requireAuth } from '../middleware/authMiddleware.js'

const router = Router()
router.use(requireAuth)
router.get('/', asyncHandler(getInvoices))
router.post('/', allowRoles('admin', 'staff'), asyncHandler(createInvoice))
router.patch('/:id', allowRoles('admin', 'staff'), asyncHandler(updateInvoice))
router.delete('/:id', allowRoles('admin'), asyncHandler(deleteInvoice))

export default router