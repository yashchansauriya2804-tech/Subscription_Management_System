export async function getCustomers() {
  return Promise.resolve([
    { id: 1, name: 'Alicia Moore', email: 'alicia@example.com', plan: 'Pro', status: 'Active' },
    { id: 2, name: 'Daniel Brooks', email: 'daniel@example.com', plan: 'Starter', status: 'Pending' },
    { id: 3, name: 'Emma Stone', email: 'emma@example.com', plan: 'Business', status: 'Active' },
    { id: 4, name: 'Leo Kim', email: 'leo@example.com', plan: 'Enterprise', status: 'Paused' },
  ])
}
