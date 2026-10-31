import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, sparse: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' },
    method: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['Succeeded', 'Pending', 'Failed'], default: 'Pending' },
  },
  { timestamps: true },
)

export default mongoose.models.Payment || mongoose.model('Payment', paymentSchema)