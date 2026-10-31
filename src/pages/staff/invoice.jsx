import { useEffect, useState } from 'react'
import DataTable from '../../components/common/DataTable'
import { getInvoices } from '../../services/invoiceService'

export default function StaffInvoicePage() {
  const [invoices, setInvoices] = useState([])

  useEffect(() => {
    getInvoices().then(setInvoices)
  }, [])

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>Invoices review</h3>
      </div>
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
