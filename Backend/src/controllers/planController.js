import Plan from '../models/Plan.js'

function serializePlan(plan) {
  return {
    id: plan._id.toString(),
    name: plan.name,
    price: plan.price,
    billingCycle: plan.billingCycle,
    detail: plan.detail,
    users: plan.users,
    status: plan.status,
  }
}

export async function getPlans(request, response) {
  const plans = await Plan.find({ active: true }).sort({ price: 1 }).lean()
  return response.json(plans.map(serializePlan))
}

export async function createPlan(request, response) {
  const { name, price, billingCycle = 'monthly', detail = '', users = '', status = 'Available' } = request.body
  if (typeof name !== 'string' || !name.trim() || !Number.isFinite(price) || price < 0) {
    return response.status(400).json({ message: 'A plan name and non-negative numeric price are required.' })
  }
  const plan = await Plan.create({ name, price, billingCycle, detail, users, status })
  return response.status(201).json(serializePlan(plan))
}

export async function updatePlan(request, response) {
  const fields = ['name', 'price', 'billingCycle', 'detail', 'users', 'status', 'active']
  const updates = Object.fromEntries(Object.entries(request.body).filter(([key]) => fields.includes(key)))
  if (Object.keys(updates).length === 0) {
    return response.status(400).json({ message: 'Provide at least one valid plan field to update.' })
  }
  if (updates.price !== undefined && (!Number.isFinite(updates.price) || updates.price < 0)) {
    return response.status(400).json({ message: 'Plan price must be a non-negative number.' })
  }
  const plan = await Plan.findByIdAndUpdate(
    request.params.id,
    updates,
    { new: true, runValidators: true },
  )
  if (!plan) return response.status(404).json({ message: 'Plan not found.' })
  return response.json(serializePlan(plan))
}

export async function deletePlan(request, response) {
  const plan = await Plan.findByIdAndUpdate(request.params.id, { active: false }, { new: true })
  if (!plan) return response.status(404).json({ message: 'Plan not found.' })
  return response.status(204).end()
}