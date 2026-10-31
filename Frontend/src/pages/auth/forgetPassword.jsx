import { Link } from 'react-router-dom'
import { useState } from 'react'
import Button from '../../components/common/Button'
import { resetPassword } from '../../services/authService'

export default function ForgetPasswordPage() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const email = event.target.email.value
    setMessage('')
    setError('')
    try {
      const response = await resetPassword(email)
      setMessage(response.message)
    } catch (requestError) {
      setError(requestError.message || 'Unable to request a password reset.')
    }
  }

  return (
    <div className="auth-shell">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-header">
          <p className="eyebrow">Forgot password</p>
          <h2>Reset access</h2>
        </div>

        {message && <div role="status">{message}</div>}
        {error && <div className="auth-error" role="alert">{error}</div>}

        <label>
          Email
          <input name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
        </label>

        <Button type="submit" className="w-full">Send reset link</Button>

        <p className="auth-link">
          <Link to="/login">Back to login</Link>
        </p>
      </form>
    </div>
  )
}
