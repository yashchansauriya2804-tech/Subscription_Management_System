import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import { resetPassword } from '../../services/authService'

export default function ForgetPasswordPage() {
  const handleSubmit = async (event) => {
    event.preventDefault()
    const email = event.target.email.value
    await resetPassword(email)
    alert('Password reset instructions sent. Please check your inbox.')
  }

  return (
    <div className="auth-shell">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-header">
          <p className="eyebrow">Forgot password</p>
          <h2>Reset access</h2>
        </div>

        <label>
          Email
          <input name="email" type="email" placeholder="you@example.com" />
        </label>

        <Button type="submit" className="w-full">Send reset link</Button>

        <p className="auth-link">
          <Link to="/login">Back to login</Link>
        </p>
      </form>
    </div>
  )
}
