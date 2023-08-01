import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register';
import AddBlog from './pages/AddBlog'

const App = () => {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/addBlog' element={<AddBlog />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </>
    </Router>
  )
}

export default App