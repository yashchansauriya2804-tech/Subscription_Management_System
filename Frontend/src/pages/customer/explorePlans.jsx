export default function CustomerPlansPage() {
  const plans = [
    { name: 'Starter', price: '$19', detail: 'For individuals' },
    { name: 'Pro', price: '$49', detail: 'Best for small teams' },
    { name: 'Business', price: '$99', detail: 'For scaling teams' },
  ]

  return (
    <div className="card-grid">
      {plans.map((plan) => (
        <div key={plan.name} className="feature-card">
          <p className="eyebrow">Popular</p>
          <h3>{plan.name}</h3>
          <h2>{plan.price}/mo</h2>
          <p>{plan.detail}</p>
        </div>
      ))}
    </div>
  )
}
