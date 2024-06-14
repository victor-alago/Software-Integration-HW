const API_URL = 'http://localhost:3000/api'; // Correct backend URL

export const createItem = async (data) => {
  try {
    const response = await fetch(`${API_URL}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create item');
    }
    const newItem = await response.json();
    return newItem;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};



export const fetchItems = async () => {
    try {
      const response = await fetch(`${API_URL}/items`);
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      const items = await response.json();
      return items;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  };