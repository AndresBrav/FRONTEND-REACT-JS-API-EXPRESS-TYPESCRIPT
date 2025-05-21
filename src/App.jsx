import { useState } from 'react'
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
