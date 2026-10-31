import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'
import { useAuth } from '../../hooks/useAuth'
import { registerUser } from '../../services/authService'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await registerUser(form)
    register({ ...response.user, role: 'customer' })
    navigate('/customer/dashboard')
  }

  return (
    <div className="auth-shell">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-header">
          <p className="eyebrow">Create account</p>
          <h2>Register</h2>
        </div>

        <label>
          Full name
          <input name="name" type="text" value={form.name} onChange={handleChange} />
        </label>

        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={handleChange} />
        </label>

        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={handleChange} />
        </label>

        <Button type="submit" className="w-full">Create account</Button>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}
