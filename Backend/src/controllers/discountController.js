import Discount from '../models/Discount.js'
import { listDiscounts } from '../services/discountService.js'

export async function getDiscounts(request, response) {
  const discounts = await listDiscounts()
  return response.json(discounts.map((discount) => ({
    id: discount._id.toString(),
    code: discount.code,
    value: discount.value,
    active: discount.active,
  })))
}

export async function createDiscount(request, response) {
  const { code, value, active = true } = request.body
  if (typeof code !== 'string' || !code.trim() || typeof value !== 'string' || !value.trim()) {
    return response.status(400).json({ message: 'A discount code and value are required.' })
  }
  const discount = await Discount.create({ code, value, active })
  return response.status(201).json({
    id: discount.id,
    code: discount.code,
    value: discount.value,
    active: discount.active,
  })
}

export async function updateDiscount(request, response) {
  const fields = ['code', 'value', 'active']
  const updates = Object.fromEntries(Object.entries(request.body).filter(([key]) => fields.includes(key)))
  if (Object.keys(updates).length === 0) {
    return response.status(400).json({ message: 'Provide at least one valid discount field to update.' })
  }
  const discount = await Discount.findByIdAndUpdate(
    request.params.id,
    updates,
    { new: true, runValidators: true },
  )
  if (!discount) return response.status(404).json({ message: 'Discount not found.' })
  return response.json({
    id: discount.id,
    code: discount.code,
    value: discount.value,
    active: discount.active,
  })
}

export async function deleteDiscount(request, response) {
  const discount = await Discount.findByIdAndDelete(request.params.id)
  if (!discount) return response.status(404).json({ message: 'Discount not found.' })
  return response.status(204).end()
}