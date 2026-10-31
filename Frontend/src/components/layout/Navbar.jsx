import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function Navbar({ title = 'Dashboard' }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Subscription platform</p>
        <h1>{title}</h1>
      </div>

      <div className="topbar-actions">
        <div className="user-badge">
          <span className="avatar">{user?.name?.[0] || 'U'}</span>
          <div>
            <strong>{user?.name || 'User'}</strong>
            <small>{user?.role || 'member'}</small>
          </div>
        </div>
        <button type="button" className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}
