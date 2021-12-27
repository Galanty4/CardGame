import { createAction } from "@reduxjs/toolkit";
import { Card } from "./types";

export const makeMove = createAction<{cardsInHand: Card[], activeCards: Card[], player: 'player' | 'enemy'}>('MAKE_MOVE');

export const changePlayers = createAction<{players: string[], name: string}>('CHANGE_PLAYERS');
export const changeStoreTurn = createAction<{turn: number, name: string}>('CHANGE_STORE_TURN');

export const cardAttack = createAction<{enemyActiveCards: Card[], playerActiveCards: Card[]}>('CARD_ATTACK');