import './App.less';
import React from 'react';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/main/main';


function App() {
  const [connection, setConnection] = React.useState<any>();
  const [messages, setMessages] = React.useState<any>([]);


  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:44397/table")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (user, message) => {
        setMessages(messages => [...messages, { user, message }]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", { user, room });

      setConnection(connection);

    } catch (e) {
      console.log(e);
    }

  }

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  }

    return (
    <div className="app">
      <Routes>
        <Route path="/"  element={<Main />}/>
      </Routes>
    </div>
  )
}

export default App;
