import { useEffect, useState } from 'react'
import DataTable from '../../components/common/DataTable'
import RequestError from '../../components/common/RequestError'
import { getInvoices } from '../../services/invoiceService'

export default function StaffInvoicePage() {
  const [invoices, setInvoices] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getInvoices().then(setInvoices).catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>Invoices review</h3>
      </div>
      <RequestError message={error} />
      <DataTable
        columns={[
          { key: 'id', label: 'Invoice' },
          { key: 'customer', label: 'Customer' },
          { key: 'status', label: 'Status' },
          { key: 'amount', label: 'Amount' },
        ]}
        rows={invoices}
      />
    </div>
  )
}
