import { useEffect, useState } from 'react'
import DataTable from '../../components/common/DataTable'
import { getSubscriptions } from '../../services/subscriptionService'

export default function AdminSubscriptionPage() {
  const [subscriptions, setSubscriptions] = useState([])

  useEffect(() => {
    getSubscriptions().then(setSubscriptions)
  }, [])

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>Subscriptions</h3>
      </div>
      <DataTable
        columns={[
          { key: 'id', label: 'Subscription ID' },
          { key: 'customer', label: 'Customer' },
          { key: 'plan', label: 'Plan' },
          { key: 'status', label: 'Status' },
          { key: 'renewal', label: 'Renewal' },
        ]}
        rows={subscriptions}
      />
    </div>
  )
}
