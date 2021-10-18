import { createAction } from '@reduxjs/toolkit'

export const updateLoading = createAction<boolean, 'UPDATE_LOADING'>(
  'UPDATE_LOADING',
)

export const actions = { updateLoading }
