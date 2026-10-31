import { calculateTax } from '../utils/generateTax.js'

export function calculateInvoiceTotals(plan, billingCycle, taxRate = 0) {
  if (!['monthly', 'yearly'].includes(billingCycle)) {
    throw new RangeError('Billing cycle must be monthly or yearly.')
  }

  const subtotal = billingCycle === 'yearly' ? plan.price * 12 : plan.price
  return calculateTax(subtotal, taxRate)
}