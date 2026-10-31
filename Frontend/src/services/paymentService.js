import { apiRequest } from './api'

export async function getPayments() {
  return apiRequest('/payments')
}

export async function getMyPaymentMethods() {
  return apiRequest('/payments/mine')
}
