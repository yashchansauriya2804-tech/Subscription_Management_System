import { apiRequest } from './api'

export async function getSubscriptions() {
  return apiRequest('/subscriptions')
}

export async function getMySubscriptions() {
  return apiRequest('/subscriptions/mine')
}
