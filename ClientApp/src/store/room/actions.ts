import { createAction } from "@reduxjs/toolkit";
import { Card } from "./types";

export const makeMove = createAction<{cardsInHand: Card[], activeCards: [], player: 'player' | 'enemy'}>('MAKE_MOVE');