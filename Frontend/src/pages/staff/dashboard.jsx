import { useEffect, useState } from 'react'
import RequestError from '../../components/common/RequestError'
import { getStaffOverview } from '../../services/reportService'

export default function StaffDashboardPage() {
  const [metrics, setMetrics] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getStaffOverview().then(setMetrics).catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <>
      <RequestError message={error} />
      <div className="stats-grid">
        {metrics.map((metric) => (
          <div key={metric.label} className="stat-card">
            <p>{metric.label}</p>
            <h3>{metric.value}</h3>
            <span>{metric.change}</span>
          </div>
        ))}
      </div>
      {!error && metrics.length === 0 && <p>No overview data is available yet.</p>}
    </>
  )
}
