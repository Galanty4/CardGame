import { store } from "../store";
import { updateMessages } from "../store/user/actions";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { cardAttack, changePlayers, changeStoreTurn, makeMove } from "../store/room/actions";
import { Card, PlayerState, Turn } from "../store/room/types";
import { Id } from "../store/generics/generics";

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

  connection.on("ReceivePlayerAttack", (user: string, attackingId: number, attackedId: number) => {
    const {turn, enemyState, playerState} = store.getState().room;
    const attackingState = turn === Turn.PLAYER_TURN ? playerState : enemyState;
    const attackedState = turn === Turn.PLAYER_TURN ? enemyState : playerState ;

    const attackingIndex = attackingState.activeCards.findIndex((el) => el.id === attackingId);
    const attackedIndex = attackedState.activeCards.findIndex((el) => el.id === attackedId);

    let attackingActiveCards = JSON.parse(JSON.stringify([...attackingState.activeCards]));
    let attackedActiveCards = JSON.parse(JSON.stringify([...attackedState.activeCards]));

    const attackingSpellpower = attackingActiveCards[attackingIndex].spellpower;
    attackingActiveCards[attackingIndex].spellpower -= attackedActiveCards[attackedIndex].spellpower;
    attackedActiveCards[attackedIndex].spellpower -= attackingSpellpower;

    attackingActiveCards = attackingActiveCards.filter((el) => el.spellpower > 0);
    attackedActiveCards = attackedActiveCards.filter((el) => el.spellpower > 0);

    store.dispatch(cardAttack({enemyActiveCards: turn === Turn.PLAYER_TURN ? attackedActiveCards : attackingActiveCards, playerActiveCards: turn === Turn.PLAYER_TURN ? attackingActiveCards : attackedActiveCards}))
  })
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

export const attackCard = async(attackingId: Id, attackedId: Id) => {
  try {
    await connection.invoke("PlayerAttack", attackingId, attackedId)
  } catch (e) {
    console.log(e)
  }
}