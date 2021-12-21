import { Id } from "../generics/generics";

export interface RoomState {
  enemyState: PlayerState;
  playerState: PlayerState;
}

export interface PlayerState {
  cardsInHand:  Card[];
  deckCards: Card[]
  activeCards: Card[];
}

export interface Card  {
  id: Id;
  description: string;
  spellpower: number;
  imgSrc: string;
}