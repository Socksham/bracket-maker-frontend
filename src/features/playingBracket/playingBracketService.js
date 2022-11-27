import axios from 'axios'

const API_URL = 'http://127.0.0.1:5500/api/playing-brackets/'

// Create new goal
const createPlayingBracket = async (bracketData, token) => {
  const token = thunkAPI.getState().auth.user.token

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, bracketData, config)
  const data = await response.data
  
  return data
}

// Get user goals
const getPlayingBracket = async (bracketData, token) => {
  console.log("SERVICE TOKEN: " + token)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + bracketData.bracketId, config)

  return response.data
}

const updatePlayingBracket = async(bracketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  
  const response = await axios.put(API_URL + bracketData.bracketId, bracketData, config)
  
  return response.data
}

const getPlayingBrackets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user goal
const deletePlayingBracket = async (bracketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + bracketId, config)

  return response.data
}

const playingBracketService = {
  getPlayingBracket,
  createPlayingBracket,
  deletePlayingBracket,
  getPlayingBrackets
}

export default playingBracketService