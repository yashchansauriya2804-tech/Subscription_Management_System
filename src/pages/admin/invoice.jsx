import { useEffect, useState } from 'react'
import DataTable from '../../components/common/DataTable'
import { getInvoices } from '../../services/invoiceService'

export default function AdminInvoicePage() {
  const [invoices, setInvoices] = useState([])

  useEffect(() => {
    getInvoices().then(setInvoices)
  }, [])

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>Invoices</h3>
      </div>
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
