import mongoose from 'mongoose'

const discountSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, trim: true, uppercase: true },
    value: { type: String, required: true, trim: true },
    active: { type: Boolean, default: false },
  },
  { timestamps: true },
)

export default mongoose.models.Discount || mongoose.model('Discount', discountSchema)