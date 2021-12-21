import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/main/main';
import Room from './pages/room/room';
import './App.less';


function App() {
    return (
    <div className="app">
      <Routes>
        <Route path="/"  element={<Main />}/>
        <Route path="/room" element={<Room />}/>
      </Routes>
    </div>
  )
}

export default App;
