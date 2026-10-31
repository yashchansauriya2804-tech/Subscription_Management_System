import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    phone: { type: String, trim: true, default: '' },
    company: { type: String, trim: true, default: '' },
    address: { type: String, trim: true, default: '' },
  },
  { timestamps: true },
)

export default mongoose.models.Customer || mongoose.model('Customer', customerSchema)