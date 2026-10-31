import Invoice from '../models/Invoice.js'
import { generateInvoiceNo } from '../utils/generateInvoiceNo.js'
import { calculateInvoiceTotals } from './billingService.js'

export async function createInvoice({ customerId, subscriptionId, plan, billingCycle }) {
  const totals = calculateInvoiceTotals(plan, billingCycle)
  return Invoice.create({
    id: generateInvoiceNo(),
    customerId,
    subscriptionId,
    amount: totals.total,
    subtotal: totals.subtotal,
    tax: totals.tax,
    status: 'Pending',
    dueDate: new Date(),
  })
}