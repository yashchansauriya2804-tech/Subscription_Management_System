import { useEffect, useState } from 'react'
import RequestError from '../../components/common/RequestError'
import { getDiscounts } from '../../services/discountService'

export default function AdminDiscountPage() {
  const [discounts, setDiscounts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getDiscounts().then(setDiscounts).catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <>
      <RequestError message={error} />
      {discounts.length > 0 ? (
        <div className="card-grid">
          {discounts.map((discount) => (
            <div key={discount.id} className="feature-card">
              <p className="eyebrow">{discount.active ? 'Live' : 'Draft'}</p>
              <h3>{discount.code}</h3>
              <p>{discount.value}</p>
            </div>
          ))}
        </div>
      ) : !error ? <p>No discounts have been configured yet.</p> : null}
    </>
  )
}
