import axios from 'axios'

const API_URL = 'http://127.0.0.1:5500/api/managing-brackets'

// Create new goal
const createManagingBracket = async (bracketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, bracketData, config)

  return response.data
}

// Get user goals
const getManagingBracket = async (bracketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + bracketId, config)

  return response.data
}

const getManagingBrackets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Delete user goal
const deleteManagingBracket = async (bracketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + bracketId, config)

  return response.data
}

const ManagingBracketService = {
  getManagingBracket,
  createManagingBracket,
  deleteManagingBracket,
  getManagingBrackets
}

export default ManagingBracketService