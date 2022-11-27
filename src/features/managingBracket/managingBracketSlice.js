import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ManagingBracketService from './managingBracketService'

import axios from 'axios'

const API_URL = 'http://127.0.0.1:5500/api/managing-brackets'

const initialState = {
  managingBrackets: [],
  managingBracket: "",
  managingLockDate: null,
  isManagingError: false,
  isManagingSuccess: false,
  isManagingLoading: false,
  managingMessage: '',
}

export const createManagingBracket = createAsyncThunk(
  'managing-bracket/create',
  async (bracketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.post(API_URL, bracketData, config)
      const data = await response.data
      
      return data

    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getManagingBracket = createAsyncThunk(
  'managing-bracket/get',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ManagingBracketService.getManagingBracket(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const getManagingBrackets = createAsyncThunk(
  'managing-bracket/getAll',
  async (_, thunkAPI) => {
      try {
          const token = thunkAPI.getState().auth.user.token
          const brackets = await ManagingBracketService.getManagingBrackets(token)
          console.log("ASYNC: " + brackets)
          return brackets
      } catch (error) {
          const message =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString()
          return thunkAPI.rejectWithValue(message)
      }
  }
)

export const deleteManagingBracket = createAsyncThunk(
  'managing-bracket/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await ManagingBracketService.deleteManagingBracket(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const ManagingBracketSlice = createSlice({
  name: 'managingBracket',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createManagingBracket.pending, (state) => {
        state.isManagingLoading = true
      })
      .addCase(createManagingBracket.fulfilled, (state, action) => {
        state.isManagingLoading = false
        state.isManagingSuccess = true
        console.log(action.payload)
        if(action.payload !== undefined){
          console.log(action.payload)
          state.managingBrackets.push(action.payload)
        }
      })
      .addCase(createManagingBracket.rejected, (state, action) => {
        state.isManagingLoading = false
        state.isManagingError = true
        state.managingMessage = action.payload
      })
      .addCase(getManagingBracket.pending, (state) => {
        state.isManagingLoading = true
      })
      .addCase(getManagingBracket.fulfilled, (state, action) => {
        state.isManagingLoading = false
        state.isManagingSuccess = true
        state.managingBracket = action.payload
      })
      .addCase(getManagingBracket.rejected, (state, action) => {
        state.isManagingLoading = false
        state.isManagingError = true
        state.managingMessage = action.payload
      })
      .addCase(getManagingBrackets.pending, (state) => {
        state.isManagingLoading = true
      })
      .addCase(getManagingBrackets.fulfilled, (state, action) => {
        state.isManagingLoading = false
        state.isManagingSuccess = true
        console.log("SLICE: " + action.payload)
        state.managingBrackets = action.payload
      })
      .addCase(getManagingBrackets.rejected, (state, action) => {
        state.isManagingLoading = false
        state.isManagingError = true
        state.managingMessage = action.payload
      })
      .addCase(deleteManagingBracket.pending, (state) => {
        state.isManagingLoading = true
      })
      .addCase(deleteManagingBracket.fulfilled, (state, action) => {
        state.isManagingLoading = false
        state.isManagingSuccess = true
        state.managingBrackets = state.managingBrackets.filter(
          (bracket) => bracket._id !== action.payload.id
        )
      })
      .addCase(deleteManagingBracket.rejected, (state, action) => {
        state.isManagingLoading = false
        state.isManagingError = true
        state.managingMessage = action.payload
      })
  },
})

// export const { managingReset } = ManagingBracketSlice.actions
export default ManagingBracketSlice.reducer
