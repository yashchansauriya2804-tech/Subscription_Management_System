export default function AdminDiscountPage() {
  const discounts = [
    { code: 'WELCOME10', value: '10%', active: true },
    { code: 'FREESHIP', value: 'Free shipping', active: true },
    { code: 'BUNDLE15', value: '15%', active: false },
  ]

  return (
    <div className="card-grid">
      {discounts.map((discount) => (
        <div key={discount.code} className="feature-card">
          <p className="eyebrow">{discount.active ? 'Live' : 'Draft'}</p>
          <h3>{discount.code}</h3>
          <p>{discount.value}</p>
        </div>
      ))}
    </div>
  )
}
