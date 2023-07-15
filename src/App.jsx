import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './Components/Home';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
