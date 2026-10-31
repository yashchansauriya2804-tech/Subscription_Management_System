import { useEffect, useState } from 'react'
import RequestError from '../../components/common/RequestError'
import { getPlans } from '../../services/planService'

export default function AdminPlanPage() {
  const [plans, setPlans] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getPlans().then(setPlans).catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <>
      <RequestError message={error} />
      {plans.length > 0 ? (
        <div className="card-grid">
          {plans.map((plan) => (
            <div key={plan.id} className="feature-card">
              <p className="eyebrow">{plan.status}</p>
              <h3>{plan.name}</h3>
              <h2>${plan.price}/{plan.billingCycle === 'yearly' ? 'yr' : 'mo'}</h2>
              <p>{plan.users}</p>
            </div>
          ))}
        </div>
      ) : !error ? <p>No plans have been configured yet.</p> : null}
    </>
  )
}
