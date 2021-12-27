import { store } from "../store";
import { updateMessages } from "../store/user/actions";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { changePlayers, changeStoreTurn, makeMove } from "../store/room/actions";
import { Card, Turn } from "../store/room/types";

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

  connection.on("ReceiveActivateCard", (user: string, cardId: number) => {
    const turn = store.getState().room.turn;
    let cardsInHand = turn === Turn.PLAYER_TURN ? store.getState().room.playerState.cardsInHand : store.getState().room.enemyState.cardsInHand;
    const cardCopy = {...cardsInHand[cardId]};
    const activeCards = [...turn === Turn.PLAYER_TURN ? store.getState().room.playerState.activeCards : store.getState().room.enemyState.activeCards];
    activeCards.push(cardCopy)
    cardsInHand = cardsInHand.filter((el) => el.id !== cardId);
    store.dispatch(makeMove({activeCards, cardsInHand, player: turn === Turn.PLAYER_TURN ? 'player' : 'enemy'}))
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

export const activateCard = async (cardId: number) => {
  try {
    await connection.invoke("ActivateCard", cardId, 0);
  } catch (e) {
    console.log(e);
  }
}


// ReceiveActivateCard

// ActivateCard