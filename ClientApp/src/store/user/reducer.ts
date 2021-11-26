import { createReducer } from '@reduxjs/toolkit'
import { initialLoading } from '../reusable/reusable'
import { updateLoading, updateMessages, updateSession } from './actions'
import { getCharacterMetadata } from './asyncActions'
import { UserState } from './types'

const initialState: UserState = {
  session: {
    room: '',
    name: '',
    messages: [],
  }
}

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateLoading, (state, action) => {
      state[action.payload.itemType].isLoading = action.payload.loading
    }).addCase(updateSession, (state, action) => {
      state.session.name = action.payload.name;
      state.session.room = action.payload.room;
    })
    .addCase(getCharacterMetadata.fulfilled, (state, action) => {
      state.error = false
    })
    .addCase(getCharacterMetadata.rejected, (state, action) => {
      state.error = true
    }).addCase(updateMessages, (state, action) => {
      state.session.messages = [...action.payload]
    })
})
