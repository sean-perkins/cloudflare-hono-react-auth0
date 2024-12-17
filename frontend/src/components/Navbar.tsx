import React from 'react'
import { Link } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react'

const Navbar: React.FC = () => {
  const { 
    isAuthenticated, 
    loginWithRedirect, 
    logout 
  } = useAuth0()

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {isAuthenticated && (
          <li><Link to="/profile">Profile</Link></li>
        )}
        {!isAuthenticated ? (
          <li>
            <button onClick={() => loginWithRedirect()}>
              Log In
            </button>
          </li>
        ) : (
          <li>
            <button onClick={handleLogout}>
              Log Out
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar