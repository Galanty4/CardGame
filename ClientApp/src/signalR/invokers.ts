import { connection } from ".";
import { store } from "../store";
import { updateMessages } from "../store/user/actions";

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