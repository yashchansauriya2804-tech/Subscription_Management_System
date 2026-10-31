export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('subscription-token')
  const headers = new Headers(options.headers)

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`/api${endpoint}`, { ...options, headers })
  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload.message || `Request failed with status ${response.status}.`)
  }

  return payload
}
