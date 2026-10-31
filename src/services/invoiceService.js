export async function getInvoices() {
  return Promise.resolve([
    { id: 'INV-1001', customer: 'Alicia Moore', amount: 120, status: 'Paid', dueDate: '2026-10-25' },
    { id: 'INV-1002', customer: 'Daniel Brooks', amount: 45, status: 'Pending', dueDate: '2026-10-30' },
    { id: 'INV-1003', customer: 'Emma Stone', amount: 220, status: 'Paid', dueDate: '2026-11-02' },
    { id: 'INV-1004', customer: 'Leo Kim', amount: 310, status: 'Overdue', dueDate: '2026-11-04' },
  ])
}
