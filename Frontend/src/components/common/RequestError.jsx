export default function RequestError({ message }) {
  if (!message) return null
  return <p className="auth-error" role="alert">{message}</p>
}
