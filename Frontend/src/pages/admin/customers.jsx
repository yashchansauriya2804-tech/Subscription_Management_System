import { useEffect, useState } from 'react'
import DataTable from '../../components/common/DataTable'
import { getCustomers } from '../../services/customerService'

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([])

  useEffect(() => {
    getCustomers().then(setCustomers)
  }, [])

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>Customers</h3>
      </div>
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
