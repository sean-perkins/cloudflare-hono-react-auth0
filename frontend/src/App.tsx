import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { useAuth0 } from '@auth0/auth0-react'

// Components
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  const { isLoading } = useAuth0()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App