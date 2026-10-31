import { apiRequest } from './api'

export async function getDiscounts() {
  return apiRequest('/discounts')
}
