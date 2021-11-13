import React from 'react';
import { message } from 'antd';
import { useState } from 'react';
import './App.less';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GameCard from './components/Card/GameCard';
import Lobby from './components/Lobby/Lobby';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';


function App() {
  const [messages, setMessages] = useState([]);
  var hubConnection: HubConnection;
  const [connection, setConnection] = useState<HubConnection>();

  const joinRoom = async (user, room) => {
    try {
      var hubConnection = new HubConnectionBuilder()
        .withUrl("https://localhost:44397/table")
        .configureLogging(LogLevel.Information)
        .build();

        hubConnection.on("ReceiveMessage", (user, message) => {
        //setMessages(messages => [...messages, {user, message}]);
      });

      await hubConnection.start();
      await hubConnection.invoke("JoinRoom", { user, room });

      setConnection(hubConnection);

    } catch (e) {
      console.log(e);
    }
  };

  return <div style={{ margin: 64 }} className='app'>
    <GameCard imgSrc="/placeholder2.jpg" w={200} h={315} />
    <h2>Herringstone Lobby</h2>
    <Lobby joinRoom={joinRoom} />
  </div>;
}

export default App;
