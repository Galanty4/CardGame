import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { RootState } from './store';
import Main from './pages/main/main';
import Room from './pages/room/room';
import './App.less';

const RoomValidator = () => {
  const user = useSelector((state: RootState) => state.userReducer);
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get('roomId');

  if (user.session.name.length === 0) {
    return <Main initialRoom={roomId || ""} />
  }
  return <Room />
}


function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/room" element={RoomValidator()} />
      </Routes>
    </div>
  )
}

export default App;
