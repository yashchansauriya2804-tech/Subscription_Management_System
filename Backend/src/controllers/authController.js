import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

function publicUser(user) {
  return { id: user.id, name: user.name, email: user.email, role: user.role }
}

function tokenFor(user) {
  return jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '12h' })
}

export async function register(request, response) {
  const { name, email, password } = request.body
  if (typeof name !== 'string' || !name.trim() || typeof email !== 'string' || !email.includes('@')) {
    return response.status(400).json({ message: 'A valid name and email are required.' })
  }
  if (typeof password !== 'string' || password.length < 8) {
    return response.status(400).json({ message: 'Password must be at least 8 characters.' })
  }
  const normalizedEmail = email.trim().toLowerCase()
  if (await User.exists({ email: normalizedEmail })) {
    return response.status(409).json({ message: 'An account with this email already exists.' })
  }

  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password: await bcrypt.hash(password, 12),
    role: 'customer',
  })
  return response.status(201).json({ user: publicUser(user), token: tokenFor(user) })
}

export async function login(request, response) {
  const { email, password } = request.body
  if (typeof email !== 'string' || typeof password !== 'string') {
    return response.status(400).json({ message: 'Email and password are required.' })
  }
  const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+password')
  if (!user || !user.active || !(await bcrypt.compare(password, user.password))) {
    return response.status(401).json({ message: 'Email or password is incorrect.' })
  }
  return response.json({ user: publicUser(user), token: tokenFor(user) })
}

export function currentUser(request, response) {
  return response.json({ user: publicUser(request.user) })
}

export function forgotPassword(request, response) {
  return response.status(501).json({
    message: 'Password reset is not configured. Contact an administrator.',
  })
}