import mongoose from 'mongoose'

const invoiceSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, sparse: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
    amount: { type: Number, required: true, min: 0 },
    subtotal: { type: Number, min: 0 },
    tax: { type: Number, min: 0, default: 0 },
    status: { type: String, enum: ['Paid', 'Pending', 'Overdue', 'Cancelled'], default: 'Pending' },
    dueDate: { type: Date },
  },
  { timestamps: true },
)

export default mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema)