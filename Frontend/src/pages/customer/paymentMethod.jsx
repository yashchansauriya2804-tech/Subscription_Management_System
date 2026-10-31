import { useEffect, useState } from 'react'
import RequestError from '../../components/common/RequestError'
import { getMyPaymentMethods } from '../../services/paymentService'

export default function CustomerPaymentMethodPage() {
  const [methods, setMethods] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getMyPaymentMethods().then(setMethods).catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>Payment methods</h3>
      </div>
      <RequestError message={error} />
      <div className="invoice-list">
        {methods.map((method) => (
          <div key={method.id} className="list-row">
            <strong>{method.label}</strong>
            <span className="status-badge">{method.type}</span>
          </div>
        ))}
      </div>
      {!error && methods.length === 0 && <p>No payment methods found.</p>}
    </div>
  )
}
