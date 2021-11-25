import './App.less';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Lobby from './components/Lobby/Lobby';
import Table from './components/Table/Table';
import GameCard from './components/Card/GameCard';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';


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

  return <div style={{ margin: 64 }} className='app'>
    <GameCard imgSrc="/placeholder2.jpg" w={200} h={315} />
    <h2>Herringstone Lobby</h2>
    {!connection
      ? <Lobby joinRoom={joinRoom} />
      : <Table sendMessage={sendMessage} messages={messages} />}
  </div>;
}

export default App;
