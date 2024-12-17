import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

interface ProtectedData {
  message: string
  userId?: string
}

const Profile: React.FC = () => {
  const { user, isAuthenticated } = useAuth0()
  const [protectedData, setProtectedData] = useState<ProtectedData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await fetch('http://localhost:8787/api/protected', {
          headers: {
            'Authorization': `Bearer ${await getAccessTokenSilently()}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch protected data')
        }

        const data = await response.json()
        setProtectedData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
      }
    }

    if (isAuthenticated) {
      fetchProtectedData()
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return <div>Please log in to view your profile</div>
  }

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      
      {user && (
        <div className="user-info">
          {user.picture && (
            <img 
              src={user.picture} 
              alt="Profile" 
              className="profile-picture"
            />
          )}
          
          <div className="user-details">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            
            {user.nickname && (
              <p><strong>Nickname:</strong> {user.nickname}</p>
            )}
          </div>
        </div>
      )}

      {protectedData && (
        <div className="protected-data">
          <h2>Protected API Data</h2>
          <p>{protectedData.message}</p>
          {protectedData.userId && (
            <p><strong>User ID:</strong> {protectedData.userId}</p>
          )}
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  )
}

export default Profile