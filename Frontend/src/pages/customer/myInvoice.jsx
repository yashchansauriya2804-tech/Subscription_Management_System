import { useEffect, useState } from 'react'
import RequestError from '../../components/common/RequestError'
import { getInvoices } from '../../services/invoiceService'

export default function CustomerInvoicePage() {
  const [invoices, setInvoices] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getInvoices().then(setInvoices).catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>My invoices</h3>
      </div>
      <RequestError message={error} />
      <div className="invoice-list">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="list-row">
            <div>
              <strong>{invoice.id}</strong>
              <small>{invoice.dueDate}</small>
            </div>
            <span>${invoice.amount}</span>
            <span className="status-badge">{invoice.status}</span>
          </div>
        ))}
      </div>
      {!error && invoices.length === 0 && <p>No invoices found.</p>}
    </div>
  )
}
