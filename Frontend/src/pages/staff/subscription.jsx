import { useEffect, useState } from 'react'
import DataTable from '../../components/common/DataTable'
import RequestError from '../../components/common/RequestError'
import { getSubscriptions } from '../../services/subscriptionService'

export default function StaffSubscriptionPage() {
  const [subscriptions, setSubscriptions] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getSubscriptions().then(setSubscriptions).catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>Subscription roster</h3>
      </div>
      <RequestError message={error} />
      <DataTable
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'customer', label: 'Customer' },
          { key: 'plan', label: 'Plan' },
          { key: 'status', label: 'Status' },
        ]}
        rows={subscriptions}
      />
    </div>
  )
}
