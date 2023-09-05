import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './Components/Home';
import Dashboard from './Components/Dashboard/Dashboard';
import Register from './Components/User/Register';
import Login from './Components/User/Login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/Login" element={<Login/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
