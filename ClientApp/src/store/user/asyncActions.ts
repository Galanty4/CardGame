import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getCharacterMetadata = createAsyncThunk(
  'creator/getCharacterMetadata',
  async () => {
    const response = await axios.get<{ test: number }>(
      'https://reqres.in/api/users',
    )
    return response.data
  },
)

export const asyncActions = { getCharacterMetadata }
