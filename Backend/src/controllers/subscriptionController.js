import Subscription from '../models/Subscription.js'
import { changeSubscriptionStatus, createSubscription } from '../services/subscriptionService.js'

function serialize(subscription, customerName) {
  return {
    id: subscription.id || subscription._id.toString(),
    customer: customerName || 'Unknown customer',
    plan: subscription.planId?.name || 'Unknown plan',
    billingCycle: subscription.billingCycle,
    renewal: subscription.renewal?.toISOString().slice(0, 10) || '',
    status: subscription.status,
  }
}

export async function getSubscriptions(request, response) {
  const filter = request.user.role === 'customer' ? { customerId: request.user._id } : {}
  const subscriptions = await Subscription.find(filter)
    .populate('customerId', 'name')
    .populate('planId', 'name price')
    .sort({ createdAt: -1 })
    .lean()
  return response.json(subscriptions.map((subscription) => ({
    ...serialize(subscription, subscription.customerId?.name),
    price: subscription.planId?.price ?? 0,
  })))
}

export async function createMySubscription(request, response) {
  const { planId, billingCycle = 'monthly' } = request.body
  if (typeof planId !== 'string' || !['monthly', 'yearly'].includes(billingCycle)) {
    return response.status(400).json({ message: 'A valid plan ID and billing cycle are required.' })
  }
  const result = await createSubscription({
    customerId: request.user._id,
    planId,
    billingCycle,
  })
  return response.status(201).json({
    subscription: serialize(result.subscription),
    invoice: {
      id: result.invoice.id,
      amount: result.invoice.amount,
      status: result.invoice.status,
    },
  })
}

export async function updateSubscription(request, response) {
  const subscription = await changeSubscriptionStatus(request.params.id, request.body.status)
  return response.json(serialize(subscription))
}

export async function cancelMySubscription(request, response) {
  const subscription = await Subscription.findOne({
    _id: request.params.id,
    customerId: request.user._id,
  })
  if (!subscription) return response.status(404).json({ message: 'Subscription not found.' })
  if (subscription.status === 'Cancelled') {
    return response.status(409).json({ message: 'Subscription is already cancelled.' })
  }
  subscription.status = 'Cancelled'
  await subscription.save()
  return response.json(serialize(subscription))
}