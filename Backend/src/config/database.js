import mongoose from 'mongoose'

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    throw new Error('MONGODB_URI is required. Copy Backend/.env.example to Backend/.env and configure it.')
  }

  mongoose.set('bufferCommands', false)
  await mongoose.connect(uri)
  console.log(`MongoDB connected: ${mongoose.connection.name}`)
}