import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HomePage from './landing-page/home/HomePage'
import About from './landing-page/about/AboutPage'
import Signup from './landing-page/signup/Signup'
import Login from './landing-page/login/Login'
import ProductPage from './landing-page/products/ProductsPage'
import PricingPage from './landing-page/pricing/PricningPage'
import Support from './landing-page/support/SupportPage'
import Dashboard from './dashboard/Dashboard'
import Navbar from './landing-page/Navbar'
import './App.css'
import {BrowserRouter ,Routes,Route} from 'react-router-dom'
import Footer from './landing-page/Footer'
import SupportPage from './landing-page/Supportpage'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          {/* Navbar will not be shown on dashboard */}
          <Routes>
            {/* Public routes */}
            <Route path="/" element={
              <>
                <Navbar />
                <HomePage />
                <Footer />
              </>
            } />
            <Route path="/about" element={
              <>
                <Navbar />
                <About />
                <Footer />
              </>
            } />
            <Route path="/signup" element={
              <>
                <Navbar />
                <Signup />
                <Footer />
              </>
            } />
            <Route path="/login" element={
              <>
                <Navbar />
                <Login />
                <Footer />
              </>
            } />
            <Route path="/products" element={
              <>
                <Navbar />
                <ProductPage />
                <Footer />
              </>
            } />
            <Route path="/pricing" element={
              <>
                <Navbar />
                <PricingPage />
                <Footer />
              </>
            } />
            <Route path="/support" element={
              <>
                <Navbar />
                <Support />
                <Footer />
              </>
            } />
            
            {/* Protected dashboard route - no navbar or footer */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            {/* Fallback route */}
            <Route path="/*" element={
              <>
                <Navbar />
                <SupportPage />
                <Footer />
              </>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
