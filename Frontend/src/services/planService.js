import { apiRequest } from './api'

export async function getPlans() {
  return apiRequest('/plans')
}
