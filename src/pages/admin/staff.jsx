export default function AdminStaffPage() {
  const staff = [
    { name: 'Sonia Patel', role: 'Operations Manager', email: 'sonia@company.com' },
    { name: 'Maya Reed', role: 'Support Lead', email: 'maya@company.com' },
    { name: 'Jonas Bell', role: 'Finance Analyst', email: 'jonas@company.com' },
  ]

  return (
    <div className="card-grid">
      {staff.map((member) => (
        <div key={member.email} className="feature-card">
          <p className="eyebrow">{member.role}</p>
          <h3>{member.name}</h3>
          <p>{member.email}</p>
        </div>
      ))}
    </div>
  )
}
