import { NavLink } from 'react-router-dom'

const menuByRole = {
  admin: [
    { label: 'Overview', path: '/admin/dashboard' },
    { label: 'Customers', path: '/admin/customers' },
    { label: 'Plans', path: '/admin/plans' },
    { label: 'Products', path: '/admin/products' },
    { label: 'Subscriptions', path: '/admin/subscriptions' },
    { label: 'Invoices', path: '/admin/invoices' },
    { label: 'Payments', path: '/admin/payments' },
    { label: 'Analytics', path: '/admin/analytics' },
    { label: 'Discounts', path: '/admin/discounts' },
    { label: 'Staff', path: '/admin/staff' },
  ],
  customer: [
    { label: 'Dashboard', path: '/customer/dashboard' },
    { label: 'Explore Plans', path: '/customer/plans' },
    { label: 'Subscriptions', path: '/customer/subscriptions' },
    { label: 'Invoices', path: '/customer/invoices' },
    { label: 'Payment Methods', path: '/customer/payment-methods' },
    { label: 'My Profile', path: '/customer/profile' },
  ],
  staff: [
    { label: 'Overview', path: '/staff/dashboard' },
    { label: 'Customers', path: '/staff/customers' },
    { label: 'Subscriptions', path: '/staff/subscriptions' },
    { label: 'Invoices', path: '/staff/invoices' },
  ],
}

export default function Sidebar({ role = 'admin' }) {
  const items = menuByRole[role] || menuByRole.admin

  return (
    <aside className="sidebar">
      <div className="brand-block">
        <div className="brand-mark">S</div>
        <div>
          <strong>SubsFlow</strong>
          <small>Billing Suite</small>
        </div>
      </div>

      <nav className="nav-menu">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
