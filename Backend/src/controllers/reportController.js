import Invoice from '../models/Invoice.js'
import Subscription from '../models/Subscription.js'
import User from '../models/User.js'
import { getOverview, getRevenueTrend } from '../services/reportService.js'

export async function overview(request, response) {
  return response.json(await getOverview())
}

export async function revenueTrend(request, response) {
  return response.json(await getRevenueTrend())
}

export async function staffOverview(request, response) {
  const now = new Date()
  const nextMonth = new Date(now)
  nextMonth.setDate(nextMonth.getDate() + 30)
  const [customers, activeSubscriptions, pendingInvoices, upcomingRenewals] = await Promise.all([
    User.countDocuments({ role: 'customer', active: true }),
    Subscription.countDocuments({ status: 'Active' }),
    Invoice.countDocuments({ status: 'Pending' }),
    Subscription.countDocuments({ status: 'Active', renewal: { $gte: now, $lte: nextMonth } }),
  ])
  return response.json([
    { label: 'Customers', value: customers.toLocaleString(), change: 'Active accounts' },
    { label: 'Active subscriptions', value: activeSubscriptions.toLocaleString(), change: 'Current' },
    { label: 'Pending invoices', value: pendingInvoices.toLocaleString(), change: 'Needs review' },
    { label: 'Renewals due', value: upcomingRenewals.toLocaleString(), change: 'Next 30 days' },
  ])
}