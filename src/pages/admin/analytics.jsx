export default function AdminAnalyticsPage() {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <p>MRR</p>
        <h3>$68.4K</h3>
        <span>+12.3%</span>
      </div>
      <div className="stat-card">
        <p>New subscribers</p>
        <h3>874</h3>
        <span>+8.7%</span>
      </div>
      <div className="stat-card">
        <p>Retention</p>
        <h3>94.2%</h3>
        <span>+1.4%</span>
      </div>
      <div className="stat-card">
        <p>Refunds</p>
        <h3>1.6%</h3>
        <span>-0.3%</span>
      </div>
    </div>
  )
}
