import { useAuth } from '../../hooks/useAuth'

export default function CustomerProfilePage() {
  const { user } = useAuth()

  return (
    <div className="panel profile-panel">
      <div className="panel-header">
        <h3>Profile</h3>
      </div>
      <div className="profile-card">
        <div className="profile-avatar">{user?.name?.[0] || 'U'}</div>
        <div>
          <h3>{user?.name || 'User'}</h3>
          <p>{user?.email || 'user@example.com'}</p>
          <p className="status-badge">{user?.role || 'customer'}</p>
        </div>
      </div>
    </div>
  )
}
