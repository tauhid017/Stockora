import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HomePage from './landing-page/home/HomePage'
import About from './landing-page/about/AboutPage'
import Signup from './landing-page/signup/Signup'
import ProductPage from './landing-page/products/ProductsPage'
import PricingPage from './landing-page/pricing/PricningPage'
import Support from './landing-page/support/SupportPage'
import './App.css'
import {BrowserRouter ,Routes,Route} from 'react-router-dom'
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/products" element={<ProductPage/>} />
      <Route path="/pricing" element={<PricingPage/>} />
      <Route path="/support" element={<Support/>} />
      {/* Add more routes as needed */}
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
