import { Router } from 'express'
import mongoose from 'mongoose'
import analyticsRoutes from './analyticsRoutes.js'
import authRoutes from './authRoutes.js'
import customerRoutes from './customerRoutes.js'
import discountRoutes from './discountRoutes.js'
import invoiceRoutes from './invoiceRoutes.js'
import paymentRoutes from './paymentRoutes.js'
import planRoutes from './planRoutes.js'
import productRoutes from './productRoutes.js'
import quotationRoutes from './quotationRoutes.js'
import reportRoutes from './reportRoutes.js'
import staffRoutes from './staffRoutes.js'
import subscriptionRoutes from './subscriptionRoutes.js'

const router = Router()

router.get('/health', (request, response) => {
  const connected = mongoose.connection.readyState === 1
  response.status(connected ? 200 : 503).json({
    status: connected ? 'ok' : 'degraded',
    database: connected ? 'connected' : 'disconnected',
  })
})

router.use('/auth', authRoutes)
router.use('/customers', customerRoutes)
router.use('/staff', staffRoutes)
router.use('/discounts', discountRoutes)
router.use('/invoices', invoiceRoutes)
router.use('/payments', paymentRoutes)
router.use('/plans', planRoutes)
router.use('/products', productRoutes)
router.use('/quotations', quotationRoutes)
router.use('/reports', reportRoutes)
router.use('/analytics', analyticsRoutes)
router.use('/subscriptions', subscriptionRoutes)

export default router
