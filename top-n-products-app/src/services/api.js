import axios from 'axios';

const API_URL = 'http://20.244.56.144/test';


export const getTopProducts = async (company, category, topN, minPrice, maxPrice, authToken) => {
  try {
    const response = await axios.get(`${API_URL}/companies/${company}/categories/${category}/products`, {
      params: { top: topN, minPrice, maxPrice },
      headers: { Authorization: `Bearer ${authToken}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
