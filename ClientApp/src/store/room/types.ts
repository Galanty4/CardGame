import { NotifyInfo } from "rc-field-form/lib/interface";
import { Id } from "../generics/generics";

export interface RoomState {
  enemyState: PlayerState;
  playerState: PlayerState;
  turn: Turn;
  playerTurnIndex: number;
  players: string[];
}

export interface PlayerState {
  cardsInHand: Card[];
  deckCards: Card[]
  activeCards: Card[];
}

export interface Card {
  id: Id;
  name: string;
  description: string;
  spellpower: number;
  cost: number;
  health: number;
  imgSrc: string;
}

export enum Turn {
  PLAYER_TURN,
  ENEMY_TURN,
  NO_TURN,
}