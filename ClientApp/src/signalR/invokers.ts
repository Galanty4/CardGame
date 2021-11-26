import { store } from "../store";
import { updateMessages } from "../store/user/actions";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

export const connection = new HubConnectionBuilder()
.withUrl("/table")
.configureLogging(LogLevel.Information)
.build();

connection.start().then(() => {
  connection.on("ReceiveMessage", (user, message) => {
    const messages = store.getState().userReducer.session.messages;
    store.dispatch(updateMessages([...messages, {user, message}]))
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
    const session = store.getState().userReducer.session;
    store.dispatch(updateMessages([...session.messages, {user: session.name, message}]))
  } catch (e) {
    console.log(e);
  }
}