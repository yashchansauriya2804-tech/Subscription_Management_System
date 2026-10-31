import { apiRequest } from './api'

export async function getProducts() {
  return apiRequest('/products')
}
