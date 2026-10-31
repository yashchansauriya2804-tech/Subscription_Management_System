export default function CustomerSubscriptionPage() {
  const subscriptions = [
    { plan: 'Pro', cycle: 'Monthly', amount: '$49', status: 'Active' },
    { plan: 'Analytics Add-on', cycle: 'Yearly', amount: '$120', status: 'Pending' },
  ]

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>My subscriptions</h3>
      </div>
      <div className="invoice-list">
        {subscriptions.map((item) => (
          <div key={item.plan} className="list-row">
            <div>
              <strong>{item.plan}</strong>
              <small>{item.cycle}</small>
            </div>
            <span>{item.amount}</span>
            <span className="status-badge">{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
