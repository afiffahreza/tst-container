import { Routes, Route } from 'react-router-dom';
import React from 'react'
import SignIn from './login';
import Home from './home'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<SignIn/>}/>
        <Route exact path="/home" element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
