export default function CustomerInvoicePage() {
  const invoices = [
    { id: 'INV-1001', date: '2026-10-12', amount: '$49', status: 'Paid' },
    { id: 'INV-1002', date: '2026-11-12', amount: '$49', status: 'Pending' },
  ]

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>My invoices</h3>
      </div>
      <div className="invoice-list">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="list-row">
            <div>
              <strong>{invoice.id}</strong>
              <small>{invoice.date}</small>
            </div>
            <span>{invoice.amount}</span>
            <span className="status-badge">{invoice.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
