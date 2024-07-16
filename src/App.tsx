import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SignUpPage from "./pages/Register"
import LoginPage from "./pages/Login"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App
