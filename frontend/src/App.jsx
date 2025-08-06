import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HomePage from './landing-page/home/HomePage'
import About from './landing-page/about/AboutPage'
import Signup from './landing-page/Authentication/Signup'
import Login from './landing-page/Authentication/Login'
import ProductPage from './landing-page/products/ProductsPage'
import PricingPage from './landing-page/pricing/PricningPage'
import Support from './landing-page/support/SupportPage'
import Navbar from './landing-page/Navbar'
import './App.css'
import {BrowserRouter ,Routes,Route} from 'react-router-dom'
import Footer from './landing-page/Footer'
import SupportPage from './landing-page/Supportpage'
import 'react-toastify';

// Create a separate component that uses useLocation (inside Router)
function AppContent() {
  const location = useLocation();
  
  // Pages where navbar and footer should be hidden
  const hideNavAndFooter = ['/login', '/signup'].includes(location.pathname);

  return (
    <>
      {/* Conditionally render Navbar */}
      {!hideNavAndFooter && <Navbar/>}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/products" element={<ProductPage/>} />
        <Route path="/pricing" element={<PricingPage/>} />
        <Route path="/support" element={<Support/>} />
        <Route path="/*" element={<SupportPage/>} />
      </Routes>
      
      {/* Conditionally render Footer */}
      {!hideNavAndFooter && <Footer />}
    </>
  )
}

// Main App component with BrowserRouter
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App