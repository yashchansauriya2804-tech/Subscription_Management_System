import { Link } from 'react-router-dom'

const features = [
  'Subscription management',
  'Recurring billing',
  'Invoice management',
  'Payment tracking',
  'Flexible discounts',
  'Business analytics',
]

const steps = [
  { number: '01', title: 'Create an account', text: 'Register and access your personalized account.' },
  { number: '02', title: 'Choose a plan', text: 'Explore products and select a subscription plan.' },
  { number: '03', title: 'Manage billing', text: 'Track subscriptions, invoices, and payments.' },
  { number: '04', title: 'Track progress', text: 'View updates and insights from your dashboard.' },
]

const plans = [
  {
    name: 'STARTER',
    price: '₹999',
    description: 'For individuals and small teams',
    features: ['Subscription management', 'Basic invoice tracking', 'Payment history', 'Email support'],
    tag: '',
    featured: false,
  },
  {
    name: 'BUSINESS PRO',
    price: '₹2,499',
    description: 'For growing businesses',
    features: ['Everything in Starter', 'Automated recurring billing', 'Advanced analytics', 'Discount management', 'Priority support'],
    tag: 'MOST POPULAR',
    featured: true,
  },
  {
    name: 'ENTERPRISE',
    price: '₹8,999',
    description: 'For larger organizations',
    features: ['Everything in Business Pro', 'Multiple staff accounts', 'Advanced reporting', 'Custom configuration', 'Dedicated support'],
    tag: '',
    featured: false,
  },
]

const faqs = [
  'What is Subscript?',
  'Can I manage my subscriptions online?',
  'Can businesses automate recurring invoices?',
  'Does the platform support different user roles?',
  'Can I change or cancel my plan?',
]

const overviewStats = [
  { label: 'Monthly revenue', value: '₹2.48L', delta: '12.8% this month' },
  { label: 'Active subscriptions', value: '1,284', delta: '8.2% this month' },
]

export default function HomePage() {
  return (
    <div className="home-page">
      <header className="home-header">
        <div className="brand-wrap">
          <div className="brand-badge">S</div>
          <span className="brand-name">Subscript</span>
        </div>

        <nav className="home-nav" aria-label="Main navigation">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#faqs">FAQs</a>
        </nav>

        <div className="nav-actions">
          <Link to="/login" className="nav-login">Log in</Link>
          <Link to="/register" className="primary-btn">Get started</Link>
        </div>
      </header>

      <main className="home-main">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="hero-kicker">● ONE PLATFORM. COMPLETE CONTROL.</p>
            <h1>Manage your subscriptions, the smarter way.</h1>
            <p className="hero-text">
              Simplify subscription management, automate recurring billing, track payments, and get a clear picture of your business — all in one place.
            </p>

            <div className="hero-actions">
              <Link to="/register" className="primary-btn">Get started for free</Link>
              <a href="#features" className="secondary-btn">Explore features</a>
            </div>

            <div className="hero-badges">
              <span>✓ Easy subscription tracking</span>
              <span>✓ Automated billing</span>
            </div>
          </div>

          <div className="hero-card" aria-label="Business overview dashboard preview">
            <div className="mini-header">
              <div>
                <p className="mini-label">BUSINESS OVERVIEW</p>
                <strong>Dashboard</strong>
              </div>
              <span className="mini-tag">This month</span>
            </div>

            <div className="mini-stats">
              {overviewStats.map((item) => (
                <div key={item.label} className="mini-stat-block">
                  <small>{item.label}</small>
                  <div className="stat-row">
                    <strong>{item.value}</strong>
                    <span>{item.delta}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="chart-box">
              <div className="chart-header">
                <span>Revenue overview</span>
                <small>Last 6 months</small>
              </div>
              <div className="chart-bars">
                {['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map((month, index) => (
                  <div key={month} className="bar-item">
                    <div className="bar" style={{ height: `${52 + index * 16}px` }} />
                    <span>{month}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="recent-box">
              <div className="recent-head">
                <span>Recent subscriptions</span>
                <span className="recent-pill">Active</span>
              </div>
              <div className="recent-row">
                <div>
                  <strong>Acme Technologies</strong>
                  <small>Active</small>
                </div>
                <span>₹2,499</span>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section" id="features">
          <p className="section-kicker">EVERYTHING YOU NEED TO MANAGE RECURRING BUSINESS</p>
          <h2>Powerful features</h2>
          <p className="section-copy">Everything in one place</p>

          <div className="feature-grid">
            {features.map((feature) => (
              <div key={feature} className="feature-item">
                <span className="feature-dot">■</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="detail-feature-block">
          <div className="feature-panel">
            <p className="section-kicker small-kicker">BILLING</p>
            <h3>Recurring billing</h3>
            <p>Streamline billing cycles and automate invoice generation.</p>
          </div>
          <div className="feature-panel">
            <p className="section-kicker small-kicker">SUBSCRIPTIONS</p>
            <h3>Subscriptions</h3>
            <p>Create, activate, pause, renew, and close subscriptions from one dashboard.</p>
          </div>
          <div className="feature-panel">
            <p className="section-kicker small-kicker">PAYMENTS</p>
            <h3>Payment tracking</h3>
            <p>Record payments and monitor outstanding and overdue invoices.</p>
          </div>
          <div className="feature-panel">
            <p className="section-kicker small-kicker">INVOICES</p>
            <h3>Invoice management</h3>
            <p>Generate, send, and track invoices with clear payment statuses.</p>
          </div>
          <div className="feature-panel">
            <p className="section-kicker small-kicker">ANALYTICS</p>
            <h3>Business analytics</h3>
            <p>Understand revenue, active subscriptions, and payment trends.</p>
          </div>
        </section>

        <section className="workflow-section" id="how-it-works">
          <p className="section-kicker">SIMPLE WORKFLOW</p>
          <h2>Get started in four steps</h2>
          <p className="section-copy">A simple process for customers and businesses.</p>

          <div className="step-grid">
            {steps.map((step) => (
              <div key={step.number} className="step-card">
                <span className="step-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="pricing-section" id="pricing">
          <p className="section-kicker">PRICING PLANS</p>
          <h2>Choose what works for you</h2>
          <p className="section-copy">Explore plans that match your needs.</p>

          <div className="pricing-toggle">
            <button type="button" className="switch-btn active">Monthly</button>
            <button type="button" className="switch-btn">Yearly · Save 15%</button>
          </div>

          <div className="pricing-grid">
            {plans.map((plan) => (
              <div key={plan.name} className={`pricing-card ${plan.featured ? 'popular' : ''}`}>
                {plan.tag && <span className="plan-badge">{plan.tag}</span>}
                <h3>{plan.name}</h3>
                <div className="price-row">
                  <span className="currency">₹</span>
                  <span className="price-value">{plan.price.replace('₹', '').trim()}</span>
                  <span className="price-period">/ month</span>
                </div>
                <p className="plan-desc">{plan.description}</p>
                <button type="button" className={`plan-btn ${plan.featured ? 'primary-btn' : 'secondary-btn'}`}>
                  Choose {plan.name === 'STARTER' ? 'Starter' : plan.name === 'BUSINESS PRO' ? 'Pro' : 'Enterprise'}
                </button>
                <ul className="plan-features">
                  {plan.features.map((feature) => (
                    <li key={feature}>✓ {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="faq-section" id="faqs">
          <p className="section-kicker">HELP CENTER</p>
          <h2>Frequently asked questions</h2>
          <p className="section-copy">Quick answers to help you get started.</p>

          <div className="faq-list">
            {faqs.map((faq) => (
              <div key={faq} className="faq-item">
                <span className="faq-dot">■</span>
                <span>{faq}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready to simplify your subscriptions?</h2>
          <p>Bring billing, payments, and subscription management together.</p>
          <Link to="/register" className="primary-btn">Create your account</Link>
          <small>Illustrative plans and prices shown for this design preview.</small>
        </section>
      </main>

      <footer className="home-footer">
        <div className="footer-brand">
          <div className="brand-wrap">
            <div className="brand-badge">S</div>
            <span className="brand-name">Subscript.</span>
          </div>
          <p>A unified platform for smarter subscription and recurring billing management.</p>
        </div>

        <div className="footer-links">
          <div>
            <h4>PLATFORM</h4>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#how-it-works">How it works</a>
          </div>
          <div>
            <h4>ACCOUNT</h4>
            <Link to="/login">Log in</Link>
            <Link to="/register">Sign up</Link>
            <a href="#faqs">FAQs</a>
          </div>
        </div>
      </footer>

      <div className="footer-bottom">
        <span>© 2026 Subscript. All rights reserved.</span>
        <span>Built for simpler subscription management.</span>
      </div>
    </div>
  )
}
