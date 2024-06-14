import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import { createItem, fetchItems, deleteItem, updateItem } from './services/api';
global.fetch = jest.fn();



jest.spyOn(global, 'fetch').mockResolvedValueOnce({
  ok: true,
  json: async () => ({
    id: 1,
    name: 'Test Item',
    description: 'Test Description'
  })
});

jest.mock('./services/api');






//4
describe('API calls', () => {
  const API_URL = 'http://localhost:3000/api';

  test('fetchItems', async () => {
    fetch.mockReturnValue(Promise.resolve({
      json: () => Promise.resolve([{ id: 1, name: 'Item 1' }])
    }));
    const items = await fetchItems();
    expect(items).toEqual([{ id: 1, name: 'Item 1' }]);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/items`);
  });

  test('createItem', async () => {
    const newItem = { name: 'New Item', description: 'New Description' };
    fetch.mockReturnValue(Promise.resolve({
      json: () => Promise.resolve(newItem)
    }));
    const result = await createItem(newItem);
    expect(result).toEqual(newItem);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/items`, expect.any(Object));
  });

  test('deleteItem', async () => {
    fetch.mockReturnValue(Promise.resolve(new Response()));
    await deleteItem(1);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/items/1`, expect.any(Object));
  });

  test('updateItem', async () => {
    const updatedItem = { name: 'Updated Item', description: 'Updated Description' };
    fetch.mockReturnValue(Promise.resolve({
      json: () => Promise.resolve(updatedItem)
    }));
    await updateItem(1, updatedItem);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/items/1`, expect.any(Object));
  });
});