export async function getPayments() {
  return Promise.resolve([
    { id: 'PAY-201', customer: 'Alicia Moore', method: 'Visa •••• 3462', amount: 120, status: 'Succeeded' },
    { id: 'PAY-202', customer: 'Daniel Brooks', method: 'PayPal', amount: 45, status: 'Pending' },
    { id: 'PAY-203', customer: 'Emma Stone', method: 'Mastercard •••• 8910', amount: 220, status: 'Succeeded' },
    { id: 'PAY-204', customer: 'Leo Kim', method: 'Stripe', amount: 310, status: 'Failed' },
  ])
}
