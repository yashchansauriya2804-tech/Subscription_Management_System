import 'dotenv/config'
import bcrypt from 'bcryptjs'
import app from './app.js'
import { connectDatabase } from './config/database.js'
import Plan from './models/Plan.js'
import User from './models/User.js'

async function ensureDefaultPlans() {
  const plans = [
    { name: 'Starter', price: 19, billingCycle: 'monthly', detail: 'For individuals', users: '1-5 users', status: 'Popular' },
    { name: 'Pro', price: 49, billingCycle: 'monthly', detail: 'Best for small teams', users: '10 users', status: 'In demand' },
    { name: 'Business', price: 99, billingCycle: 'monthly', detail: 'For scaling teams', users: 'Unlimited', status: 'Recommended' },
  ]
  for (const plan of plans) {
    await Plan.updateOne({ name: plan.name }, { $setOnInsert: plan }, { upsert: true })
  }
}

async function ensureInitialAdmin() {
  const email = process.env.INITIAL_ADMIN_EMAIL?.trim().toLowerCase()
  const password = process.env.INITIAL_ADMIN_PASSWORD
  if (!email && !password) return
  if (!email || !password || password.length < 12) {
    throw new Error('Set both INITIAL_ADMIN_EMAIL and INITIAL_ADMIN_PASSWORD (at least 12 characters), or leave both unset.')
  }

  const existingAdmin = await User.findOne({ email })
  if (existingAdmin) return

  const name = email.split('@')[0]
  await User.create({
    name,
    email,
    password: await bcrypt.hash(password, 12),
    role: 'admin',
  })
  console.log(`Initial admin created for ${email}`)
}

async function startServer() {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET is required and must be at least 32 characters.')
  }

  await connectDatabase()
  await ensureDefaultPlans()
  await ensureInitialAdmin()

  const port = Number(process.env.PORT || 3001)
  app.listen(port, '0.0.0.0', () => {
    console.log(`API listening on http://localhost:${port}`)
  })
}

startServer().catch((error) => {
  console.error(`Backend startup failed: ${error.message}`)
  process.exitCode = 1
})