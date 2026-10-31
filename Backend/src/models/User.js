import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['admin', 'staff', 'customer'], default: 'customer' },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
)

export default mongoose.models.User || mongoose.model('User', userSchema)