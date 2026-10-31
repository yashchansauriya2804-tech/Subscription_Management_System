export async function loginUser(credentials) {
  return Promise.resolve({
    user: {
      id: 1,
      name: credentials.email?.split('@')[0] || 'Admin User',
      email: credentials.email,
      role: credentials.email?.includes('customer') ? 'customer' : 'admin',
    },
  })
}

export async function registerUser(payload) {
  return Promise.resolve({
    user: {
      id: Date.now(),
      name: payload.name,
      email: payload.email,
      role: 'customer',
    },
  })
}

export async function resetPassword(email) {
  return Promise.resolve({
    success: true,
    email,
    message: 'Password reset instructions sent.',
  })
}
