import { connection } from ".";
import { store } from "../store";
import { updateMessages } from "../store/user/actions";

connection.on("ReceiveMessage", (user, message) => {
  const messages = store.getState().userReducer.session.messages;
  store.dispatch(updateMessages([...messages, {user, message}]))
});