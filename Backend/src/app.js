import cors from 'cors'
import express from 'express'
import { errorHandler, notFoundHandler } from './middleware/errorMiddleware.js'
import apiRoutes from './routes/apiRoutes.js'

const app = express()
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(cors({ origin: allowedOrigins }))
app.use(express.json({ limit: '1mb' }))
app.use('/api', apiRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app