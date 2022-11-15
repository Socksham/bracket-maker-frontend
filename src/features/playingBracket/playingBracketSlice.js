import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import playingBracketService from './playingBracketService'

const initialState = {
  playingBrackets: [],
  playingBracket: "",
  isPlayingError: false,
  isPlayingSuccess: false,
  isPlayingLoading: false,
  playingMessage: '',
}

export const createPlayingBracket = createAsyncThunk(
  'bracket/create',
  async (bracketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await playingBracketService.createPlayingBracket(bracketData, token)

      // return bracketData.joinCode
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

export const getPlayingBracket = createAsyncThunk(
  'bracket/get',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await playingBracketService.getPlayingBracket(token)
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

export const getPlayingBrackets = createAsyncThunk(
  'bracket/getAll',
  async (_, thunkAPI) => {
      try {
          const token = thunkAPI.getState().auth.user.token
          return await playingBracketService.getPlayingBrackets(token)
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

export const deletePlayingBracket = createAsyncThunk(
  'bracket/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await playingBracketService.deletePlayingBracket(id, token)
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

export const playingBracketSlice = createSlice({
  name: 'playingBracket',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPlayingBracket.pending, (state) => {
        state.isPlayingLoading = true
      })
      .addCase(createPlayingBracket.fulfilled, (state, action) => {
        state.isPlayingLoading = false
        state.isPlayingSuccess = true
        state.playingBrackets.push(action.payload)
      })
      .addCase(createPlayingBracket.rejected, (state, action) => {
        state.isPlayingLoading = false
        state.isPlayingError = true
        state.playingMessage = action.payload
      })
      .addCase(getPlayingBracket.pending, (state) => {
        state.isPlayingLoading = true
      })
      .addCase(getPlayingBracket.fulfilled, (state, action) => {
        state.isPlayingLoading = false
        state.isPlayingSuccess = true
        state.playingBracket = action.payload
      })
      .addCase(getPlayingBracket.rejected, (state, action) => {
        state.isPlayingLoading = false
        state.isPlayingError = true
        state.playingMessage = action.payload
      })
      .addCase(getPlayingBrackets.pending, (state) => {
        state.isPlayingLoading = true
      })
      .addCase(getPlayingBrackets.fulfilled, (state, action) => {
        state.isPlayingLoading = false
        state.isPlayingSuccess = true
        state.playingBrackets = action.payload
      })
      .addCase(getPlayingBrackets.rejected, (state, action) => {
        state.isPlayingLoading = false
        state.isPlayingError = true
        state.message = action.payload
      })
      .addCase(deletePlayingBracket.pending, (state) => {
        state.isPlayingLoading = true
      })
      .addCase(deletePlayingBracket.fulfilled, (state, action) => {
        state.isPlayingLoading = false
        state.isPlayingSuccess = true
        state.playingBrackets = state.playingBrackets.filter(
          (bracket) => bracket._id !== action.payload.id
        )
      })
      .addCase(deletePlayingBracket.rejected, (state, action) => {
        state.isPlayingLoading = false
        state.isPlayingError = true
        state.playingMessage = action.payload
      })
  },
})

export const { playingReset } = playingBracketSlice.actions
export default playingBracketSlice.reducer
