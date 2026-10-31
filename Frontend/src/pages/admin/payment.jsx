import { useEffect, useState } from 'react'
import DataTable from '../../components/common/DataTable'
import { getPayments } from '../../services/paymentService'

export default function AdminPaymentPage() {
  const [payments, setPayments] = useState([])

  useEffect(() => {
    getPayments().then(setPayments)
  }, [])

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>Payments</h3>
      </div>
      <DataTable
        columns={[
          { key: 'id', label: 'Payment ID' },
          { key: 'customer', label: 'Customer' },
          { key: 'method', label: 'Method' },
          { key: 'amount', label: 'Amount' },
          { key: 'status', label: 'Status' },
        ]}
        rows={payments}
      />
    </div>
  )
}
