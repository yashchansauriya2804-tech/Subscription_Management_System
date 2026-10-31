import Plan from '../models/Plan.js'
import { calculateInvoiceTotals } from '../services/billingService.js'
import { applyDiscount } from '../services/discountService.js'

export async function previewQuotation(request, response) {
  const { planId, billingCycle = 'monthly', discountCode } = request.body
  if (typeof planId !== 'string' || !['monthly', 'yearly'].includes(billingCycle)) {
    return response.status(400).json({ message: 'A valid plan ID and billing cycle are required.' })
  }
  const plan = await Plan.findOne({ _id: planId, active: true }).lean()
  if (!plan) return response.status(404).json({ message: 'The selected plan is unavailable.' })
  const totals = calculateInvoiceTotals(plan, billingCycle)
  const discount = await applyDiscount(discountCode, totals.subtotal)
  return response.json({
    plan: { id: plan._id.toString(), name: plan.name },
    billingCycle,
    subtotal: totals.subtotal,
    discount: totals.subtotal - discount.total,
    tax: totals.tax,
    total: Math.round((discount.total + totals.tax) * 100) / 100,
  })
}