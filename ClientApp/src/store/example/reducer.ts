import { createReducer } from '@reduxjs/toolkit'
import { updateLoading } from './actions'
import { getCharacterMetadata } from './asyncActions'
import { ExampleState } from './types'

const initialState: ExampleState = {
  isLoading: false,
  error: false,
}

export const exampleReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateLoading, (state, action) => {
      state.isLoading = action.payload
    })
    .addCase(getCharacterMetadata.fulfilled, (state, action) => {
      state.error = false
    })
    .addCase(getCharacterMetadata.rejected, (state, action) => {
      state.error = true
    })
})
