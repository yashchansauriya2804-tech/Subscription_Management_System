export async function apiRequest(endpoint, options = {}) {
  const response = await Promise.resolve({
    ok: true,
    endpoint,
    data: options.body ? JSON.parse(options.body) : null,
  })

  return response
}
