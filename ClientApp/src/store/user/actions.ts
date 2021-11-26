import { createAction } from '@reduxjs/toolkit'
import {UserState} from './types';
export const updateLoading = createAction<{loading: boolean, itemType: keyof UserState}>('UPDATE_LOADING');

export const updateSession = createAction<{room: string, name: string}>('UPDATE_SESSION');

export const actions = { updateLoading }


