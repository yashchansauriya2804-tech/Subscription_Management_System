import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'
import { useAuth } from '../../hooks/useAuth'
import { registerUser } from '../../services/authService'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    try {
      const response = await registerUser(form)
      register(response)
      navigate('/customer/dashboard')
    } catch (requestError) {
      setError(requestError.message || 'Unable to create your account.')
    }
  }

  return (
    <div className="auth-shell">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-header">
          <p className="eyebrow">Create account</p>
          <h2>Register</h2>
        </div>

        {error && <div className="auth-error" role="alert">{error}</div>}

        <label>
          Full name
          <input name="name" type="text" autoComplete="name" required value={form.name} onChange={handleChange} />
        </label>

        <label>
          Email
          <input name="email" type="email" autoComplete="email" required value={form.email} onChange={handleChange} />
        </label>

        <label>
          Password
          <input name="password" type="password" autoComplete="new-password" minLength={8} required value={form.password} onChange={handleChange} />
        </label>

        <Button type="submit" className="w-full">Create account</Button>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}
