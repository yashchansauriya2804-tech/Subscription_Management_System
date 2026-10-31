import { apiRequest } from './api'

export async function getInvoices() {
  return apiRequest('/invoices')
}
