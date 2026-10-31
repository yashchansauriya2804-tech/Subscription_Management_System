import Plan from '../models/Plan.js'
import Subscription from '../models/Subscription.js'
import { createInvoice } from './invoiceService.js'

export async function createSubscription({ customerId, planId, billingCycle }) {
  const plan = await Plan.findOne({ _id: planId, active: true })
  if (!plan) {
    const error = new Error('The selected plan does not exist or is unavailable.')
    error.status = 404
    throw error
  }

  const subscription = await Subscription.create({
    customerId,
    planId: plan._id,
    billingCycle,
    status: 'Pending',
  })
  const invoice = await createInvoice({
    customerId,
    subscriptionId: subscription._id,
    plan,
    billingCycle,
  })
  return { subscription, invoice }
}

export async function changeSubscriptionStatus(subscriptionId, status) {
  if (!['Active', 'Pending', 'Paused', 'Cancelled'].includes(status)) {
    const error = new Error('Subscription status is invalid.')
    error.status = 400
    throw error
  }
  const subscription = await Subscription.findByIdAndUpdate(
    subscriptionId,
    { status },
    { new: true, runValidators: true },
  )
  if (!subscription) {
    const error = new Error('Subscription not found.')
    error.status = 404
    throw error
  }
  return subscription
}