import { useEffect, useState } from 'react'
import DataTable from '../../components/common/DataTable'
import RequestError from '../../components/common/RequestError'
import { getOverviewMetrics, getRevenueTrend } from '../../services/reportService'
import { getSubscriptions } from '../../services/subscriptionService'

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState([])
  const [trend, setTrend] = useState([])
  const [subscriptions, setSubscriptions] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([getOverviewMetrics(), getRevenueTrend(), getSubscriptions()])
      .then(([overview, revenueTrend, recentSubscriptions]) => {
        setMetrics(overview)
        setTrend(revenueTrend)
        setSubscriptions(recentSubscriptions)
      })
      .catch((requestError) => setError(requestError.message))
  }, [])

  return (
    <div className="page-grid">
      <RequestError message={error} />
      <section className="stats-grid">
        {metrics.map((metric) => (
          <div key={metric.label} className="stat-card">
            <p>{metric.label}</p>
            <h3>{metric.value}</h3>
            <span>{metric.change}</span>
          </div>
        ))}
      </section>

      <section className="panel">
        <div className="panel-header">
          <h3>Revenue trend</h3>
        </div>
        <div className="chart-bars">
          {trend.map((point) => (
            <div key={point.month} className="bar-group">
              <span className="bar" style={{ height: `${point.revenue * 2}px` }} />
              <small>{point.month}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h3>Recent subscriptions</h3>
        </div>
        <DataTable
          columns={[
            { key: 'id', label: 'ID' },
            { key: 'customer', label: 'Customer' },
            { key: 'plan', label: 'Plan' },
            { key: 'status', label: 'Status' },
          ]}
          rows={subscriptions.slice(0, 4)}
        />
      </section>
    </div>
  )
}
