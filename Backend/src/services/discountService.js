import Discount from '../models/Discount.js'

export async function listDiscounts() {
  return Discount.find().sort({ createdAt: -1 }).lean()
}

export async function applyDiscount(code, amount) {
  if (!code) return { discount: null, total: amount }
  const discount = await Discount.findOne({ code: code.trim().toUpperCase(), active: true })
  if (!discount) {
    const error = new Error('The discount code is invalid or inactive.')
    error.status = 400
    throw error
  }

  const percent = /^(\d+(?:\.\d+)?)%$/.exec(discount.value)
  const fixed = /^\$?(\d+(?:\.\d+)?)$/.exec(discount.value)
  if (!percent && !fixed) {
    const error = new Error('This discount has an invalid value configuration.')
    error.status = 422
    throw error
  }
  const reduction = percent
    ? amount * Number(percent[1]) / 100
    : Number(fixed[1])
  return { discount, total: Math.max(0, Math.round((amount - reduction) * 100) / 100) }
}