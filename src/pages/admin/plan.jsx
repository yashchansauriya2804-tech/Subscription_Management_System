export default function AdminPlanPage() {
  const plans = [
    { name: 'Starter', price: '$19/mo', users: '1-5 users', status: 'Popular' },
    { name: 'Pro', price: '$49/mo', users: '10 users', status: 'In demand' },
    { name: 'Business', price: '$99/mo', users: 'Unlimited', status: 'Recommended' },
  ]

  return (
    <div className="card-grid">
      {plans.map((plan) => (
        <div key={plan.name} className="feature-card">
          <p className="eyebrow">{plan.status}</p>
          <h3>{plan.name}</h3>
          <h2>{plan.price}</h2>
          <p>{plan.users}</p>
        </div>
      ))}
    </div>
  )
}
