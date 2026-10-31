import { createContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

function getStoredUser() {
  if (!localStorage.getItem('subscription-token')) {
    localStorage.removeItem('subscription-user')
    return null
  }

  const storedUser = localStorage.getItem('subscription-user')
  return storedUser ? JSON.parse(storedUser) : null
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser)

  useEffect(() => {
    if (user) {
      localStorage.setItem('subscription-user', JSON.stringify(user))
    } else {
      localStorage.removeItem('subscription-user')
      localStorage.removeItem('subscription-token')
    }
  }, [user])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login: ({ user: loggedInUser, token }) => {
        localStorage.setItem('subscription-token', token)
        setUser(loggedInUser)
      },
      logout: () => setUser(null),
      register: ({ user: registeredUser, token }) => {
        localStorage.setItem('subscription-token', token)
        setUser(registeredUser)
      },
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
