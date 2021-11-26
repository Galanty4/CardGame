import { createAction } from '@reduxjs/toolkit'
import {ChatMessage, UserState} from './types';
export const updateLoading = createAction<{loading: boolean, itemType: keyof UserState}>('UPDATE_LOADING');

export const updateSession = createAction<{room: string, name: string}>('UPDATE_SESSION');

export const updateMessages = createAction<ChatMessage[]>('UPDATE_MESSAGE');

export const actions = { updateLoading }


