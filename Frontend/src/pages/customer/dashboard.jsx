import { useEffect, useState } from 'react'
import RequestError from '../../components/common/RequestError'
import { useAuth } from '../../hooks/useAuth'
import { getMySubscriptions } from '../../services/subscriptionService'

export default function CustomerDashboardPage() {
  const { user } = useAuth()
  const [subscriptions, setSubscriptions] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getMySubscriptions().then(setSubscriptions).catch((requestError) => setError(requestError.message))
  }, [])

  const currentSubscription = subscriptions.find((subscription) => subscription.status === 'Active')
  const renewalDate = currentSubscription?.renewal
    ? new Date(`${currentSubscription.renewal}T00:00:00`).toLocaleDateString()
    : 'Not scheduled'

  return (
    <>
      <RequestError message={error} />
      <div className="stats-grid">
        <div className="stat-card">
          <p>Current plan</p>
          <h3>{currentSubscription?.plan || 'No active plan'}</h3>
          <span>{currentSubscription?.billingCycle || 'Choose a plan to get started'}</span>
        </div>
        <div className="stat-card">
          <p>Next renewal</p>
          <h3>{currentSubscription ? `$${currentSubscription.price}` : '—'}</h3>
          <span>{renewalDate}</span>
        </div>
        <div className="stat-card">
          <p>Subscriptions</p>
          <h3>{subscriptions.length}</h3>
          <span>{user?.name || 'Customer'}</span>
        </div>
        <div className="stat-card">
          <p>Support</p>
          <h3>Contact</h3>
          <span>Reach out for assistance</span>
        </div>
      </div>
    </>
  )
}
