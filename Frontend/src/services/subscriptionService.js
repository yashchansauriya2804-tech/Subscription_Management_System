export async function getSubscriptions() {
  return Promise.resolve([
    { id: 'SUB-301', customer: 'Alicia Moore', plan: 'Pro', billingCycle: 'Monthly', renewal: '2026-11-14', status: 'Active' },
    { id: 'SUB-302', customer: 'Daniel Brooks', plan: 'Starter', billingCycle: 'Yearly', renewal: '2026-12-02', status: 'Pending' },
    { id: 'SUB-303', customer: 'Emma Stone', plan: 'Business', billingCycle: 'Monthly', renewal: '2026-11-08', status: 'Active' },
    { id: 'SUB-304', customer: 'Leo Kim', plan: 'Enterprise', billingCycle: 'Yearly', renewal: '2026-11-18', status: 'Paused' },
  ])
}
