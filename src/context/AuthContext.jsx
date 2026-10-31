import { createContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const defaultUser = {
  id: 1,
  name: 'Admin User',
  email: 'admin@subscription.com',
  role: 'admin',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('subscription-user')
    return storedUser ? JSON.parse(storedUser) : defaultUser
  })

  useEffect(() => {
    localStorage.setItem('subscription-user', JSON.stringify(user))
  }, [user])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login: (payload) => setUser(payload),
      logout: () => setUser(null),
      register: (payload) => setUser(payload),
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
