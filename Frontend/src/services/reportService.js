import { apiRequest } from './api'

export async function getOverviewMetrics() {
  return apiRequest('/reports/overview')
}

export async function getRevenueTrend() {
  return apiRequest('/reports/revenue-trend')
}

export async function getStaffOverview() {
  return apiRequest('/reports/staff-overview')
}
