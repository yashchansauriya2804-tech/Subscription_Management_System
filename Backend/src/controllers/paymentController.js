import Payment from '../models/Payment.js'
import { recordPayment } from '../services/paymentService.js'

export async function getPayments(request, response) {
  const filter = request.user.role === 'customer' ? { customerId: request.user._id } : {}
  const payments = await Payment.find(filter)
    .populate('customerId', 'name')
    .sort({ createdAt: -1 })
    .lean()
  return response.json(payments.map((payment) => ({
    id: payment.id || payment._id.toString(),
    customer: payment.customerId?.name || 'Unknown customer',
    method: payment.method,
    amount: payment.amount,
    status: payment.status,
  })))
}

export async function getMyPaymentMethods(request, response) {
  const payments = await Payment.find({ customerId: request.user._id })
    .select('method')
    .sort({ createdAt: -1 })
    .lean()
  const methods = new Map()
  for (const payment of payments) {
    if (!methods.has(payment.method)) methods.set(payment.method, payment._id.toString())
  }
  return response.json([...methods].map(([label, id], index) => ({
    id,
    label,
    type: index === 0 ? 'Primary' : 'Backup',
  })))
}

export async function createPayment(request, response) {
  const { invoiceId, method, status = 'Pending' } = request.body
  if (typeof invoiceId !== 'string' || typeof method !== 'string' || !method.trim()) {
    return response.status(400).json({ message: 'Invoice ID and payment method are required.' })
  }
  const payment = await recordPayment({ invoiceId, method: method.trim(), status })
  return response.status(201).json({
    id: payment.id || payment._id.toString(),
    invoiceId: payment.invoiceId,
    amount: payment.amount,
    method: payment.method,
    status: payment.status,
  })
}