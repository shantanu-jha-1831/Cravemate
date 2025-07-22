import axios from 'axios'

const API_BASE_URL = 'https://your-api-endpoint.com/api'

export const getRecommendations = async (mood, answers) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/recommendations`, {
      mood,
      answers
    })
    return response.data
  } catch (error) {
    console.error('Error fetching recommendations:', error)
    throw error
  }
}

export const getMenuItems = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/menu`)
    return response.data
  } catch (error) {
    console.error('Error fetching menu items:', error)
    throw error
  }
}