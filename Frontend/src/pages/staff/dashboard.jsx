export default function StaffDashboardPage() {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <p>Open tickets</p>
        <h3>18</h3>
        <span>+6 today</span>
      </div>
      <div className="stat-card">
        <p>Renewals due</p>
        <h3>42</h3>
        <span>7 urgent</span>
      </div>
      <div className="stat-card">
        <p>Avg. resolution</p>
        <h3>2.4d</h3>
        <span>-0.6d</span>
      </div>
      <div className="stat-card">
        <p>Satisfaction</p>
        <h3>96%</h3>
        <span>+2.3%</span>
      </div>
    </div>
  )
}
