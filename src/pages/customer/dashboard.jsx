import { useAuth } from '../../hooks/useAuth'

export default function CustomerDashboardPage() {
  const { user } = useAuth()

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <p>Current plan</p>
        <h3>Pro</h3>
        <span>Monthly</span>
      </div>
      <div className="stat-card">
        <p>Next billing</p>
        <h3>$49</h3>
        <span>Nov 14, 2026</span>
      </div>
      <div className="stat-card">
        <p>Usage</p>
        <h3>78%</h3>
        <span>{user?.name || 'Customer'}</span>
      </div>
      <div className="stat-card">
        <p>Support</p>
        <h3>Live</h3>
        <span>Priority</span>
      </div>
    </div>
  )
}
