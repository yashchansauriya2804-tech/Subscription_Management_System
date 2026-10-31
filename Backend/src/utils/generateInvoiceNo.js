import { randomBytes } from 'node:crypto'

export function generateInvoiceNo() {
  const year = new Date().getFullYear()
  return `INV-${year}-${randomBytes(4).toString('hex').toUpperCase()}`
}