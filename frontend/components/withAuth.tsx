// hoc/withAuth.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function withAuth<T>(Component: React.ComponentType<T>) {
  return function ProtectedComponent(props: T) {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
      const token = localStorage.getItem('token')
      if (!token) {
        router.replace('/login')
      } else {
        setIsAuthenticated(true)
      }
    }, [])

    if (!isAuthenticated) return null // You can return a loading spinner instead

    return <Component {...(props as JSX.IntrinsicAttributes & T)} />
  }
}

export function withGuest<T>(Component: React.ComponentType<T>) {
  return function GuestComponent(props: T) {
    const router = useRouter()
    const [isGuest, setIsGuest] = useState(false)

    useEffect(() => {
      const token = localStorage.getItem('token')
      if (token) {
        router.replace('/dashboard')
      } else {
        setIsGuest(true)
      }
    }, [])

    if (!isGuest) return null // You can return a loading spinner instead

    return <Component {...(props as JSX.IntrinsicAttributes & T)} />
  }
}

export function roleback<T>(Component: React.ComponentType<T>, allowedRoles: string[]) {
  return function RoleBasedComponent(props: T) {
    const router = useRouter()
    const [hasAccess, setHasAccess] = useState(false)

    useEffect(() => {
      const token = localStorage.getItem('token')
      const userRole = localStorage.getItem('userRole') // Assuming you store user role in localStorage

      if (!token) {
        router.replace('/login')
        return
      }

      if (!userRole || !allowedRoles.includes(userRole)) {
        router.replace('/unauthorized')
        return
      }

      setHasAccess(true)
    }, [])

    if (!hasAccess) return null // You can return a loading spinner instead

    return <Component {...(props as JSX.IntrinsicAttributes & T)} />
  }
}
