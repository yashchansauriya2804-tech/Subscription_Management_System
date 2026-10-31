import { apiRequest } from './api'

export async function getStaff() {
  return apiRequest('/staff')
}
