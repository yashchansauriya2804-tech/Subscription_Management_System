import mongoose from 'mongoose'

const subscriptionSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
    billingCycle: { type: String, enum: ['monthly', 'yearly'], default: 'monthly' },
    status: { type: String, enum: ['Active', 'Pending', 'Paused', 'Cancelled'], default: 'Active' },
    renewal: { type: Date },
  },
  { timestamps: true },
)

export default mongoose.models.Subscription || mongoose.model('Subscription', subscriptionSchema)