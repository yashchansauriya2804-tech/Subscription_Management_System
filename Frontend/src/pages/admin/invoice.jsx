import { useEffect, useState } from 'react'
import DataTable from '../../components/common/DataTable'
import RequestError from '../../components/common/RequestError'
import { getInvoices } from '../../services/invoiceService'

export default function AdminInvoicePage() {
  const [invoices, setInvoices] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getInvoices().then(setInvoices).catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>Invoices</h3>
      </div>
      <RequestError message={error} />
      <DataTable
        columns={[
          { key: 'id', label: 'Invoice' },
          { key: 'customer', label: 'Customer' },
          { key: 'amount', label: 'Amount' },
          { key: 'status', label: 'Status' },
          { key: 'dueDate', label: 'Due date' },
        ]}
        rows={invoices}
      />
    </div>
  )
}
