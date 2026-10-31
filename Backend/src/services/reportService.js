import Invoice from '../models/Invoice.js'
import Subscription from '../models/Subscription.js'
import User from '../models/User.js'

export async function getOverview() {
  const [paidInvoices, activeSubscriptions, customerCount] = await Promise.all([
    Invoice.find({ status: 'Paid' }).select('amount').lean(),
    Subscription.countDocuments({ status: 'Active' }),
    User.countDocuments({ role: 'customer', active: true }),
  ])
  const revenue = paidInvoices.reduce((total, invoice) => total + invoice.amount, 0)
  return [
    { label: 'Paid revenue', value: `$${revenue.toLocaleString()}`, change: 'All time' },
    { label: 'Active subscriptions', value: activeSubscriptions.toLocaleString(), change: 'Current' },
    { label: 'Customers', value: customerCount.toLocaleString(), change: 'Registered' },
    { label: 'Avg. invoice value', value: `$${paidInvoices.length ? Math.round(revenue / paidInvoices.length) : 0}`, change: 'Paid invoices' },
  ]
}

export async function getRevenueTrend() {
  const currentMonth = new Date()
  currentMonth.setDate(1)
  currentMonth.setHours(0, 0, 0, 0)
  const start = new Date(currentMonth)
  start.setMonth(start.getMonth() - 5)
  const invoices = await Invoice.find({
    status: 'Paid',
    createdAt: { $gte: start },
  }).select('amount createdAt').lean()
  const totals = new Map()
  for (const invoice of invoices) {
    const key = `${invoice.createdAt.getFullYear()}-${String(invoice.createdAt.getMonth() + 1).padStart(2, '0')}`
    totals.set(key, (totals.get(key) || 0) + invoice.amount)
  }

  return Array.from({ length: 6 }, (_value, index) => {
    const date = new Date(currentMonth)
    date.setMonth(date.getMonth() - (5 - index))
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    return {
      month: date.toLocaleString('en-US', { month: 'short' }),
      revenue: Math.round((totals.get(key) || 0) / 1000),
    }
  })
}