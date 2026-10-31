import { apiRequest } from './api'

export async function getCustomers() {
  return apiRequest('/customers')
}
