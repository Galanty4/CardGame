import { createAction } from "@reduxjs/toolkit";
import { Card } from "./types";

export const makeMove = createAction<{cardsInHand: Card[], activeCards: Card[], player: 'player' | 'enemy'}>('MAKE_MOVE');