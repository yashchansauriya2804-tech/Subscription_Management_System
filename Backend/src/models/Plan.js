import mongoose from 'mongoose'

const planSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    price: { type: Number, required: true, min: 0 },
    billingCycle: { type: String, enum: ['monthly', 'yearly'], default: 'monthly' },
    detail: { type: String, default: '' },
    users: { type: String, default: '' },
    status: { type: String, default: 'Available' },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
)

export default mongoose.models.Plan || mongoose.model('Plan', planSchema)