import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import playingBracketService from './playingBracketService'

const initialState = {
  playingBrackets: [],
  playingBracket: "",
  localPlayingBracket: {},
  isPlayingLocked: false,
  isPlayingError: false,
  isPlayingSuccess: false,
  isPlayingLoading: false,
  playingMessage: '',
}

export const createPlayingBracket = createAsyncThunk(
  'playing-bracket/create',
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
  'playing-bracket/get',
  async (bracketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      console.log("token " + token)
      return await playingBracketService.getPlayingBracket(bracketData, token)
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

export const updatePlayingBracket = createAsyncThunk(
  'playing-bracket/update',
  async (bracketData, thunkAPI) => {
      try {
          const token = thunkAPI.getState().auth.user.token
          // const brackets = await playingBracketService.getPlayingBrackets(bracketData, token)
          // console.log(brackets)
          const response = await playingBracketService.updatePlayingBracket(bracketData, token)
          return response
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
  'playing-bracket/getAll',
  async (_, thunkAPI) => {
      try {
          const token = thunkAPI.getState().auth.user.token
          const brackets = await playingBracketService.getPlayingBrackets(token)
          console.log(brackets)
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

export const deletePlayingBracket = createAsyncThunk(
  'playing-bracket/delete',
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
    playingReset: (state) => initialState,
    updateLocalPlayingBracket: (state, action) => {state.localPlayingBracket = action.payload}
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
        state.playingBracket = action.payload.bracket
        console.log("PAYLOAD: ")
        console.log(action.payload)
        state.localPlayingBracket = JSON.parse(action.payload.bracket)
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
        state.playingMessage = action.payload
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

export const { playingReset, updateLocalPlayingBracket } = playingBracketSlice.actions
export default playingBracketSlice.reducer
