import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Products from './pages/Products'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<LoginPage />} path='/login'/>
          <Route element={<Products />} path='/products'/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
