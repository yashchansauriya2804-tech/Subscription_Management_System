export default function CustomerPaymentMethodPage() {
  const methods = [
    { id: 'VISA', label: 'Visa •••• 3462', type: 'Primary' },
    { id: 'PAYPAL', label: 'PayPal', type: 'Backup' },
  ]

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>Payment methods</h3>
      </div>
      <div className="invoice-list">
        {methods.map((method) => (
          <div key={method.id} className="list-row">
            <strong>{method.label}</strong>
            <span className="status-badge">{method.type}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
