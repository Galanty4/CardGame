import { connection } from ".";

connection.on("ReceiveMessage", (user, message) => {
  console.log('hello');
  // setMessages(messages => [...messages, { user, message }]);
});