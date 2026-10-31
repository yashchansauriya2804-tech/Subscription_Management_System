export default function StaffCustomerPage() {
  const customers = [
    { id: 1, name: 'Alicia Moore', status: 'Active' },
    { id: 2, name: 'Daniel Brooks', status: 'Pending' },
  ]

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>Customer management</h3>
      </div>
      <div className="invoice-list">
        {customers.map((customer) => (
          <div key={customer.id} className="list-row">
            <strong>{customer.name}</strong>
            <span className="status-badge">{customer.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
