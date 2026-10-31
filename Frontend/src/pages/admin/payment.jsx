import { useEffect, useState } from 'react'
import DataTable from '../../components/common/DataTable'
import RequestError from '../../components/common/RequestError'
import { getPayments } from '../../services/paymentService'

export default function AdminPaymentPage() {
  const [payments, setPayments] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getPayments().then(setPayments).catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>Payments</h3>
      </div>
      <RequestError message={error} />
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
