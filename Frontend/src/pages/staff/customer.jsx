import { useEffect, useState } from 'react'
import DataTable from '../../components/common/DataTable'
import RequestError from '../../components/common/RequestError'
import { getCustomers } from '../../services/customerService'

export default function StaffCustomerPage() {
  const [customers, setCustomers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getCustomers().then(setCustomers).catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <>
      <div className="panel">
        <div className="panel-header">
          <h3>Customer management</h3>
        </div>
        <RequestError message={error} />
        <DataTable
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            { key: 'status', label: 'Status' },
          ]}
          rows={customers}
        />
      </div>
      {!error && customers.length === 0 && <p>No customer accounts have been registered yet.</p>}
    </>
  )
}
