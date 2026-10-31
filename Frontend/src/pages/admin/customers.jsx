import { useEffect, useState } from 'react'
import DataTable from '../../components/common/DataTable'
import RequestError from '../../components/common/RequestError'
import { getCustomers } from '../../services/customerService'

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getCustomers().then(setCustomers).catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>Customers</h3>
      </div>
      <RequestError message={error} />
      <DataTable
        columns={[
          { key: 'id', label: 'ID' },
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'plan', label: 'Plan' },
          { key: 'status', label: 'Status' },
        ]}
        rows={customers}
      />
    </div>
  )
}
