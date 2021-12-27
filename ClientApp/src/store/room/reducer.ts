import { createReducer } from '@reduxjs/toolkit'
import { store } from '..'
import { changeTurn } from '../../signalR/invokers'
import { cardAttack, changePlayers, changeStoreTurn, makeMove } from './actions'
import { Card, RoomState, Turn } from './types'


// imgSrc='/placeholder2.jpg' description={<span><b>Attack: </b> Fireball Enemies</span>} spellPower={Math.floor(Math.random() * 10)
const initialEnemyState: Card[] = [
  {
    id: 0,
    description: '<span><b>Attack: </b> Fireball Enemies</span>',
    spellpower: 5,
    imgSrc: '/placeholder2.jpg' 
  },
  {
    id: 1,
    description: '<span><b>Attack: </b> Fireball Enemies</span>',
    spellpower: 10,
    imgSrc: '/placeholder2.jpg' 
  },
  {
    id: 2,
    description: '<span><b>Attack: </b> Fireball Enemies</span>',
    spellpower: 4,
    imgSrc: '/placeholder2.jpg' 
  },
  {
    id: 3,
    description: '<span><b>Attack: </b> Fireball Enemies</span>',
    spellpower: 3,
    imgSrc: '/placeholder2.jpg' 
  },
]

const initialPlayerState: Card[] = [
  {
    id: 0,
    description: '<span><b>Attack: </b> Fireball Enemies</span>',
    spellpower: 5,
    imgSrc: '/placeholder2.jpg' 
  },
  {
    id: 1,
    description: '<span><b>Attack: </b> Fireball Enemies</span>',
    spellpower: 10,
    imgSrc: '/placeholder2.jpg' 
  },
  {
    id: 2,
    description: '<span><b>Attack: </b> Fireball Enemies</span>',
    spellpower: 4,
    imgSrc: '/placeholder2.jpg' 
  },
  {
    id: 3,
    description: '<span><b>Attack: </b> Fireball Enemies</span>',
    spellpower: 3,
    imgSrc: '/placeholder2.jpg' 
  },
]

const initialState: RoomState = {
  enemyState: {
    cardsInHand: initialEnemyState,
    deckCards: [],
    activeCards: [],
  },
  playerState: {
    cardsInHand: initialPlayerState,
    deckCards: [],
    activeCards: [],
  },
  turn: Turn.NO_TURN,
  players: [],
  playerTurnIndex: 0,
}

export const roomReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(makeMove, (state, action) => {
      if (action.payload.player === 'enemy') {
        state.enemyState.cardsInHand = action.payload.cardsInHand;
        state.enemyState.activeCards = action.payload.activeCards;
      } else {
        state.playerState.cardsInHand = action.payload.cardsInHand;
        state.playerState.activeCards = action.payload.activeCards;
      }
    }).addCase(changePlayers, (state, action) => {
      state.players = action.payload.players;
      if (action.payload.players.length === 2) {
        const user = action.payload.name;
        const turn = Math.floor(Math.random() * 2);
        state.playerTurnIndex = turn;
        state.turn = action.payload.players[turn] === user ? Turn.PLAYER_TURN : Turn.ENEMY_TURN;
        changeTurn(turn);
      } 
    }).addCase(changeStoreTurn, (state, action) => {
      state.playerTurnIndex = action.payload.turn
      state.turn = state.players[action.payload.turn] === action.payload.name ? Turn.PLAYER_TURN : Turn.ENEMY_TURN;
    }).addCase(cardAttack, (state, action) => {
        state.playerState.activeCards = action.payload.playerActiveCards;
        state.enemyState.activeCards = action.payload.enemyActiveCards;
    })
})
