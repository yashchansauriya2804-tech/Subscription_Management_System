import bcrypt from 'bcryptjs'
import Customer from '../models/Customer.js'
import Subscription from '../models/Subscription.js'
import User from '../models/User.js'

export async function listCustomers(request, response) {
  const [customers, subscriptions] = await Promise.all([
    User.find({ role: 'customer' }).sort({ createdAt: -1 }).lean(),
    Subscription.find().populate('planId', 'name').sort({ createdAt: -1 }).lean(),
  ])
  const plans = new Map()
  for (const subscription of subscriptions) {
    const key = String(subscription.customerId)
    if (!plans.has(key)) plans.set(key, subscription.planId?.name || 'None')
  }
  return response.json(customers.map((customer) => ({
    id: customer._id.toString(),
    name: customer.name,
    email: customer.email,
    plan: plans.get(String(customer._id)) || 'None',
    status: customer.active ? 'Active' : 'Inactive',
  })))
}

export async function getCustomer(request, response) {
  const customer = await User.findOne({ _id: request.params.id, role: 'customer' })
    .select('_id name email active createdAt')
    .lean()
  if (!customer) return response.status(404).json({ message: 'Customer not found.' })
  const profile = await Customer.findOne({ userId: customer._id }).lean()
  return response.json({
    id: customer._id.toString(),
    name: customer.name,
    email: customer.email,
    status: customer.active ? 'Active' : 'Inactive',
    phone: profile?.phone || '',
    company: profile?.company || '',
    address: profile?.address || '',
  })
}

export async function createCustomer(request, response) {
  const { name, email, password } = request.body
  if (typeof name !== 'string' || !name.trim() || typeof email !== 'string' || !email.includes('@')) {
    return response.status(400).json({ message: 'A valid name and email are required.' })
  }
  if (typeof password !== 'string' || password.length < 8) {
    return response.status(400).json({ message: 'Password must be at least 8 characters.' })
  }
  const user = await User.create({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password: await bcrypt.hash(password, 12),
    role: 'customer',
  })
  return response.status(201).json({ id: user.id, name: user.name, email: user.email, status: 'Active' })
}

export async function updateCustomer(request, response) {
  const allowedFields = ['name', 'email', 'active']
  const updates = Object.fromEntries(
    Object.entries(request.body).filter(([key]) => allowedFields.includes(key)),
  )
  if (Object.keys(updates).length === 0) {
    return response.status(400).json({ message: 'Provide at least one valid customer field to update.' })
  }
  if (updates.email) {
    if (typeof updates.email !== 'string' || !updates.email.includes('@')) {
      return response.status(400).json({ message: 'A valid email is required.' })
    }
    updates.email = updates.email.trim().toLowerCase()
  }
  if (updates.name !== undefined && (typeof updates.name !== 'string' || !updates.name.trim())) {
    return response.status(400).json({ message: 'Customer name cannot be empty.' })
  }
  const customer = await User.findOneAndUpdate(
    { _id: request.params.id, role: 'customer' },
    updates,
    { new: true, runValidators: true, select: '_id name email active' },
  )
  if (!customer) return response.status(404).json({ message: 'Customer not found.' })
  return response.json({
    id: customer.id,
    name: customer.name,
    email: customer.email,
    status: customer.active ? 'Active' : 'Inactive',
  })
}

export async function deactivateCustomer(request, response) {
  const customer = await User.findOneAndUpdate(
    { _id: request.params.id, role: 'customer' },
    { active: false },
    { new: true },
  )
  if (!customer) return response.status(404).json({ message: 'Customer not found.' })
  return response.status(204).end()
}

export async function getMyProfile(request, response) {
  const profile = await Customer.findOne({ userId: request.user._id }).lean()
  return response.json({
    ...request.user.toJSON(),
    phone: profile?.phone || '',
    company: profile?.company || '',
    address: profile?.address || '',
  })
}

export async function updateMyProfile(request, response) {
  const fields = ['phone', 'company', 'address']
  const updates = Object.fromEntries(Object.entries(request.body).filter(([key]) => fields.includes(key)))
  if (request.body.name !== undefined && (typeof request.body.name !== 'string' || !request.body.name.trim())) {
    return response.status(400).json({ message: 'Customer name cannot be empty.' })
  }
  const profile = await Customer.findOneAndUpdate(
    { userId: request.user._id },
    { $set: updates, $setOnInsert: { userId: request.user._id } },
    { upsert: true, new: true, runValidators: true },
  )
  if (typeof request.body.name === 'string' && request.body.name.trim()) {
    request.user.name = request.body.name.trim()
    await request.user.save()
  }
  return response.json({
    id: request.user.id,
    name: request.user.name,
    email: request.user.email,
    role: request.user.role,
    phone: profile.phone,
    company: profile.company,
    address: profile.address,
  })
}