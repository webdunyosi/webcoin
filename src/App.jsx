import { useState, useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import StudentLayout from "./layouts/StudentLayout"
import Ranking from "./pages/student/Ranking"
import Shopping from "./pages/student/Shopping"
import Account from "./pages/student/Account"
import Cart from "./pages/student/Cart"
import Login from "./pages/Login"

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cartItems, setCartItems] = useState([])

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("webcoin_user")
    if (savedUser) {
      try {
        setLoggedInUser(JSON.parse(savedUser))
      } catch (e) {
        console.error("Failed to load user from localStorage:", e)
      }
    }
    setLoading(false)
  }, [])

  const handleLogin = (user) => {
    setLoggedInUser(user)
    localStorage.setItem("webcoin_user", JSON.stringify(user))
  }

  const handleLogout = () => {
    setLoggedInUser(null)
    localStorage.removeItem("webcoin_user")
    setCartItems([])
  }

  const handleAddToCart = (product) => {
    // Check if user has enough coins
    if (loggedInUser.coins < product.price) {
      alert(
        `Yetarli coins mavjud emas! Zarur: ${product.price}, Mavjud: ${loggedInUser.coins}`,
      )
      return
    }

    // Deduct coins from user
    const updatedUser = {
      ...loggedInUser,
      coins: loggedInUser.coins - product.price,
    }

    setLoggedInUser(updatedUser)
    localStorage.setItem("webcoin_user", JSON.stringify(updatedUser))
    setCartItems([...cartItems, product])
  }

  const handleClearCart = (newCart) => {
    if (Array.isArray(newCart)) {
      setCartItems(newCart)
    } else {
      setCartItems([])
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-green-400">Yuklanyapti...</div>
      </div>
    )
  }

  return (
    <Routes>
      {/* Login Route */}
      <Route
        path="/login"
        element={
          loggedInUser ? (
            <Navigate to="/reyting" />
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />

      {/* Protected Routes */}
      <Route
        path="/reyting"
        element={
          loggedInUser ? (
            <StudentLayout user={loggedInUser} onLogout={handleLogout}>
              <Ranking />
            </StudentLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/sovgalar"
        element={
          loggedInUser ? (
            <StudentLayout user={loggedInUser} onLogout={handleLogout}>
              <Shopping onAddToCart={handleAddToCart} />
            </StudentLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/savatcha"
        element={
          loggedInUser ? (
            <StudentLayout user={loggedInUser} onLogout={handleLogout}>
              <Cart
                student={loggedInUser}
                cartItems={cartItems}
                onClearCart={handleClearCart}
              />
            </StudentLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/xisobim"
        element={
          loggedInUser ? (
            <StudentLayout user={loggedInUser} onLogout={handleLogout}>
              <Account student={loggedInUser} />
            </StudentLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Default Route */}
      <Route
        path="/"
        element={<Navigate to={loggedInUser ? "/reyting" : "/login"} />}
      />
    </Routes>
  )
}

export default App
