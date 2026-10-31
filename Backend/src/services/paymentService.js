import Invoice from '../models/Invoice.js'
import Payment from '../models/Payment.js'
import Subscription from '../models/Subscription.js'

export async function recordPayment({ invoiceId, method, status }) {
  const invoice = await Invoice.findById(invoiceId)
  if (!invoice) {
    const error = new Error('Invoice not found.')
    error.status = 404
    throw error
  }

  if (!['Succeeded', 'Pending', 'Failed'].includes(status)) {
    const error = new Error('Payment status must be Succeeded, Pending, or Failed.')
    error.status = 400
    throw error
  }

  const payment = await Payment.create({
    customerId: invoice.customerId,
    invoiceId: invoice._id,
    method,
    amount: invoice.amount,
    status,
  })
  if (status === 'Succeeded') {
    invoice.status = 'Paid'
    await invoice.save()
    if (invoice.subscriptionId) {
      await Subscription.findByIdAndUpdate(invoice.subscriptionId, { status: 'Active' })
    }
  }
  return payment
}