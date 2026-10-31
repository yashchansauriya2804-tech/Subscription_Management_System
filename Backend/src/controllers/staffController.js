import bcrypt from 'bcryptjs'
import User from '../models/User.js'

export async function listStaff(request, response) {
  const staff = await User.find({ role: 'staff', active: true }).sort({ name: 1 }).lean()
  return response.json(staff.map((member) => ({
    id: member._id.toString(),
    name: member.name,
    role: 'Staff',
    email: member.email,
  })))
}

export async function createStaff(request, response) {
  const { name, email, password } = request.body
  if (typeof name !== 'string' || !name.trim() || typeof email !== 'string' || !email.includes('@')) {
    return response.status(400).json({ message: 'A valid name and email are required.' })
  }
  if (typeof password !== 'string' || password.length < 12) {
    return response.status(400).json({ message: 'Staff password must be at least 12 characters.' })
  }
  const member = await User.create({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password: await bcrypt.hash(password, 12),
    role: 'staff',
  })
  return response.status(201).json({
    id: member.id,
    name: member.name,
    email: member.email,
    role: 'Staff',
  })
}

export async function deactivateStaff(request, response) {
  const member = await User.findOneAndUpdate(
    { _id: request.params.id, role: 'staff' },
    { active: false },
  )
  if (!member) return response.status(404).json({ message: 'Staff account not found.' })
  return response.status(204).end()
}
