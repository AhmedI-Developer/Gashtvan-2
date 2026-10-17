import { useEffect, useState } from 'react'
import { AuthContext } from '@/context/auth-context'
import {
  fetchAdminMe,
  getAdminToken,
  loginAdmin,
  logoutAdmin,
  setAdminToken,
} from '@/lib/adminApi'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getAdminToken())
  const [user, setUser] = useState(null)
  const [booting, setBooting] = useState(Boolean(getAdminToken()))

  useEffect(() => {
    if (!token) {
      queueMicrotask(() => {
        setUser(null)
        setBooting(false)
      })
      return undefined
    }

    let alive = true

    ;(async () => {
      await Promise.resolve()
      if (!alive) return
      setBooting(true)

      try {
        const me = await fetchAdminMe()
        if (alive) setUser(me)
      } catch {
        if (alive) {
          setAdminToken(null)
          setToken(null)
          setUser(null)
        }
      } finally {
        if (alive) setBooting(false)
      }
    })()

    return () => {
      alive = false
    }
  }, [token])

  const login = async (email, password) => {
    const result = await loginAdmin(email, password)
    setAdminToken(result.token)
    setToken(result.token)
    setUser(result.user)
    return result.user
  }

  const logout = async () => {
    try {
      if (getAdminToken()) await logoutAdmin()
    } catch {
      /* ignore network errors on logout */
    } finally {
      setAdminToken(null)
      setToken(null)
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        booting,
        isAuthenticated: Boolean(token && user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
