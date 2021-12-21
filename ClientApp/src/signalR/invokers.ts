import { connection } from ".";

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