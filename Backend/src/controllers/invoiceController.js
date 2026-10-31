import Invoice from '../models/Invoice.js'
import Payment from '../models/Payment.js'
import User from '../models/User.js'
import { generateInvoiceNo } from '../utils/generateInvoiceNo.js'

export async function getInvoices(request, response) {
  const filter = request.user.role === 'customer' ? { customerId: request.user._id } : {}
  const invoices = await Invoice.find(filter)
    .populate('customerId', 'name')
    .sort({ createdAt: -1 })
    .lean()
  return response.json(invoices.map((invoice) => ({
    id: invoice.id || invoice._id.toString(),
    customer: invoice.customerId?.name || 'Unknown customer',
    amount: invoice.amount,
    subtotal: invoice.subtotal ?? invoice.amount,
    tax: invoice.tax || 0,
    status: invoice.status,
    dueDate: invoice.dueDate?.toISOString().slice(0, 10) || '',
  })))
}

export async function createInvoice(request, response) {
  const { customerId, amount, dueDate } = request.body
  if (!customerId || !Number.isFinite(amount) || amount < 0) {
    return response.status(400).json({ message: 'A customer and non-negative invoice amount are required.' })
  }
  if (!await User.exists({ _id: customerId, role: 'customer' })) {
    return response.status(404).json({ message: 'Customer not found.' })
  }
  const invoice = await Invoice.create({
    id: generateInvoiceNo(),
    customerId,
    amount,
    subtotal: amount,
    tax: 0,
    dueDate: dueDate ? new Date(dueDate) : undefined,
  })
  return response.status(201).json({
    id: invoice.id,
    customerId: invoice.customerId,
    amount: invoice.amount,
    status: invoice.status,
    dueDate: invoice.dueDate,
  })
}

export async function updateInvoice(request, response) {
  const { status, dueDate } = request.body
  const updates = {}
  if (status !== undefined) updates.status = status
  if (dueDate !== undefined) updates.dueDate = new Date(dueDate)
  const invoice = await Invoice.findByIdAndUpdate(
    request.params.id,
    updates,
    { new: true, runValidators: true },
  )
  if (!invoice) return response.status(404).json({ message: 'Invoice not found.' })
  return response.json({
    id: invoice.id || invoice._id.toString(),
    amount: invoice.amount,
    status: invoice.status,
    dueDate: invoice.dueDate,
  })
}

export async function deleteInvoice(request, response) {
  if (await Payment.exists({ invoiceId: request.params.id })) {
    return response.status(409).json({ message: 'Invoices with recorded payments cannot be deleted.' })
  }
  const invoice = await Invoice.findByIdAndDelete(request.params.id)
  if (!invoice) return response.status(404).json({ message: 'Invoice not found.' })
  return response.status(204).end()
}