import { useEffect, useState } from 'react'
import RequestError from '../../components/common/RequestError'
import { getOverviewMetrics } from '../../services/reportService'

export default function AdminAnalyticsPage() {
  const [metrics, setMetrics] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getOverviewMetrics().then(setMetrics).catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <>
      <RequestError message={error} />
      {metrics.length > 0 ? (
        <div className="stats-grid">
          {metrics.map((metric) => (
            <div key={metric.label} className="stat-card">
              <p>{metric.label}</p>
              <h3>{metric.value}</h3>
              <span>{metric.change}</span>
            </div>
          ))}
        </div>
      ) : !error ? <p>No analytics data is available yet.</p> : null}
    </>
  )
}
