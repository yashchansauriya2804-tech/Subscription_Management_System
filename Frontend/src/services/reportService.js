export async function getOverviewMetrics() {
  return Promise.resolve([
    { label: 'Monthly revenue', value: '$68.4K', change: '+12.3%' },
    { label: 'Active plans', value: '2,418', change: '+9.6%' },
    { label: 'Churn rate', value: '1.8%', change: '-0.5%' },
    { label: 'Avg. order value', value: '$142', change: '+5.1%' },
  ])
}

export async function getRevenueTrend() {
  return Promise.resolve([
    { month: 'Jan', revenue: 34 },
    { month: 'Feb', revenue: 41 },
    { month: 'Mar', revenue: 36 },
    { month: 'Apr', revenue: 48 },
    { month: 'May', revenue: 52 },
    { month: 'Jun', revenue: 57 },
  ])
}
