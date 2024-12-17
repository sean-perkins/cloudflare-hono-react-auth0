import React from 'react'
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: "openid profile email"
      }}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  )
}

export default AuthProvider

// Hook for API calls with authentication
export const useProtectedFetch = () => {
  const { getAccessTokenSilently } = useAuth0()

  const protectedFetch = async (url: string, options: RequestInit = {}) => {
    try {
      const token = await getAccessTokenSilently()
      
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      return response.json()
    } catch (error) {
      console.error('Error in protected fetch:', error)
      throw error
    }
  }

  return protectedFetch
}