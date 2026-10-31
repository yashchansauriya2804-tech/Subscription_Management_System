import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'
import { useAuth } from '../../hooks/useAuth'
import { loginUser } from '../../services/authService'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: 'admin@subscription.com', password: '123456' })
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await loginUser(form)
      const user = response.user
      const role = user.role || (form.email.includes('customer') ? 'customer' : 'admin')
      login({ ...user, role })
      navigate(role === 'customer' ? '/customer/dashboard' : '/admin/dashboard')
    } catch (err) {
      setError(err.message || 'Unable to sign in.')
    }
  }

  return (
    <div className="auth-shell">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-header">
          <p className="eyebrow">Welcome back</p>
          <h2>Sign in</h2>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} />
        </label>

        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={handleChange} />
        </label>

        <div className="auth-row">
          <label className="checkbox-row">
            <input type="checkbox" /> Keep me signed in
          </label>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>

        <Button type="submit" className="w-full">Login</Button>

        <p className="auth-link">
          New here? <Link to="/register">Create account</Link>
        </p>
      </form>
    </div>
  )
}
