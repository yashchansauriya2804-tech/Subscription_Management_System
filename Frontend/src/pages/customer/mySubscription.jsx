import { useEffect, useState } from 'react'
import RequestError from '../../components/common/RequestError'
import { getMySubscriptions } from '../../services/subscriptionService'

export default function CustomerSubscriptionPage() {
  const [subscriptions, setSubscriptions] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getMySubscriptions().then(setSubscriptions).catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>My subscriptions</h3>
      </div>
      <RequestError message={error} />
      <div className="invoice-list">
        {subscriptions.map((item) => (
          <div key={item.id} className="list-row">
            <div>
              <strong>{item.plan}</strong>
              <small>{item.billingCycle}</small>
            </div>
            <span>${item.price}</span>
            <span className="status-badge">{item.status}</span>
          </div>
        ))}
      </div>
      {!error && subscriptions.length === 0 && <p>No subscriptions found.</p>}
    </div>
  )
}
