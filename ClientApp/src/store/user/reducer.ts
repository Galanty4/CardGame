import { createReducer } from '@reduxjs/toolkit'
import { initialLoading } from '../reusable/reusable'
import { updateLoading, updateSession } from './actions'
import { getCharacterMetadata } from './asyncActions'
import { UserState } from './types'

const initialState: UserState = {
  session: {
    room: '',
    name: '',
  }
}

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateLoading, (state, action) => {
      state[action.payload.itemType].isLoading = action.payload.loading
    }).addCase(updateSession, (state, action) => {
      state.session = {...action.payload};
    })
    .addCase(getCharacterMetadata.fulfilled, (state, action) => {
      state.error = false
    })
    .addCase(getCharacterMetadata.rejected, (state, action) => {
      state.error = true
    })
})
