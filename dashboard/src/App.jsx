import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Home from './components/Home.jsx';

function App() {
  return (
    <BrowserRouter>
      <Home/>
    </BrowserRouter>
  )
}

export default App
