import axios from 'axios'

const API_URL = 'http://127.0.0.1:5500/api/managing-brackets'

// Create new goal
const createManagingBracket = async (bracketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // axios.post(API_URL, bracketData, config).then((response) => {
  //   console.log("DATA")
  //   console.log(response.data)
  //   return response.data
  // })

  return await (await axios.post(API_URL, bracketData, config)).data

  // let promises = [];

  // try {
  //   promise = response.data = axios.post(API_URL, bracketData, config)
    
  // } catch (error) {
  //   console.log(error);
  // }

  // return Promise
  //   .all(promises)
  //   .then(results =>
  //     results.map(response => response.data[0])
  //   )

}

// Get user goals
const getManagingBracket = async (bracketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + bracketId, config)

  return await response.data
}

const getManagingBrackets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return await response.data
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