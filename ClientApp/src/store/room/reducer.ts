import { createReducer } from '@reduxjs/toolkit'
import { makeMove } from './actions'
import { Card, RoomState } from './types'


// imgSrc='/placeholder2.jpg' description={<span><b>Attack: </b> Fireball Enemies</span>} spellPower={Math.floor(Math.random() * 10)
const initialEnemyState: Card[] = [
  {
    id: 0,
    description: '<span><b>Attack: </b> Fireball Enemies</span>',
    spellpower: Math.floor(Math.random() * 10),
    imgSrc: '/placeholder2.jpg' 
  },
  {
    id: 1,
    description: '<span><b>Attack: </b> Fireball Enemies</span>',
    spellpower: Math.floor(Math.random() * 10),
    imgSrc: '/placeholder2.jpg' 
  },
  {
    id: 2,
    description: '<span><b>Attack: </b> Fireball Enemies</span>',
    spellpower: Math.floor(Math.random() * 10),
    imgSrc: '/placeholder2.jpg' 
  },
  {
    id: 3,
    description: '<span><b>Attack: </b> Fireball Enemies</span>',
    spellpower: Math.floor(Math.random() * 10),
    imgSrc: '/placeholder2.jpg' 
  },
]

const initialPlayerState: Card[] = [
  {
    id: 0,
    description: '<span><b>Attack: </b> Fireball Enemies</span>',
    spellpower: Math.floor(Math.random() * 10),
    imgSrc: '/placeholder2.jpg' 
  },
  {
    id: 1,
    description: '<span><b>Attack: </b> Fireball Enemies</span>',
    spellpower: Math.floor(Math.random() * 10),
    imgSrc: '/placeholder2.jpg' 
  },
  {
    id: 2,
    description: '<span><b>Attack: </b> Fireball Enemies</span>',
    spellpower: Math.floor(Math.random() * 10),
    imgSrc: '/placeholder2.jpg' 
  },
  {
    id: 3,
    description: '<span><b>Attack: </b> Fireball Enemies</span>',
    spellpower: Math.floor(Math.random() * 10),
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
  }
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
    })
})
