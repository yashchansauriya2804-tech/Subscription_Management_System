import { useEffect, useState } from 'react'
import DataTable from '../../components/common/DataTable'
import { getSubscriptions } from '../../services/subscriptionService'

export default function StaffSubscriptionPage() {
  const [subscriptions, setSubscriptions] = useState([])

  useEffect(() => {
    getSubscriptions().then(setSubscriptions)
  }, [])

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>Subscription roster</h3>
      </div>
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
