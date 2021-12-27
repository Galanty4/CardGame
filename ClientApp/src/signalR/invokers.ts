import { store } from "../store";
import { updateMessages } from "../store/user/actions";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { changePlayers, changeStoreTurn } from "../store/room/actions";

export const connection = new HubConnectionBuilder()
.withUrl("/table")
.configureLogging(LogLevel.Information)
.build();

connection.start().then(() => {
  connection.on("ReceiveMessage", (user, message) => {
    const messages = store.getState().userReducer.session.messages;
    store.dispatch(updateMessages([...messages, {user, message}]))
  });

  connection.on("UsersInRoom", (users: string[]) => {
    store.dispatch(changePlayers({players: users, name: store.getState().userReducer.session.name }))
  });

  connection.on("ReceiveTurnChange", (user: string, turn: number) => {
    store.dispatch(changeStoreTurn({turn, name: store.getState().userReducer.session.name}))
  });

})

export const joinRoom = async (user: string, room: string) => {
  try {
    await connection.invoke("JoinRoom", { user, room });
  } catch (e) {
    console.log(e);
  }
}

export const sendMessage = async (message: string) => {
  try {
    await connection.invoke("SendMessage", message);
  } catch (e) {
    console.log(e);
  }
}

export const changeTurn = async (turn: number) => {
  try {
    await connection.invoke("EndTurn", turn);
  } catch (e) {
    console.log(e);
  }
}
