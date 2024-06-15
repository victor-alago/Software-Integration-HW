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
    _id: 1,
    name: 'Test Item',
    description: 'Test Description'
  })
});

jest.mock('./services/api');



describe('App Component', () => {
  test('renders item management header', () => {
    render(<App />);
    const headerElement = screen.getByText(/Item Management/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('adds new item to the list', async () => {
    render(<App />);

    // Selecting elements
    const nameInput = screen.getByPlaceholderText(/Enter item name/i);
    const descriptionInput = screen.getByPlaceholderText(/Enter item description/i);
    const addButton = screen.getByText(/Add Item/i);

    // Simulating user input and form submission
    fireEvent.change(nameInput, { target: { value: 'Test Item' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });

    await act(async () => {
      fireEvent.click(addButton);
    });

    // Assertion to check if the new item is added to the list
    const itemNameElement = await screen.findByText(/Test Item/i);
    expect(itemNameElement).toBeInTheDocument();
  });
});



describe('ItemForm', () => {
  test('renders form elements correctly', () => {
    render(<ItemForm onItemCreated={jest.fn()} />);
    expect(screen.getByPlaceholderText(/Enter item name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter item description/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Item/i)).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    const onItemCreated = jest.fn();
    createItem.mockResolvedValue({ id: 1, name: 'Test Item', description: 'Test Description' });

    render(<ItemForm onItemCreated={onItemCreated} />);

    fireEvent.change(screen.getByPlaceholderText(/Enter item name/i), { target: { value: 'Test Item' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter item description/i), { target: { value: 'Test Description' } });

    await act(async () => {
      fireEvent.click(screen.getByText(/Add Item/i));
    });

    await waitFor(() => {
      expect(createItem).toHaveBeenCalledWith({ name: 'Test Item', description: 'Test Description' });
      expect(onItemCreated).toHaveBeenCalledWith({ id: 1, name: 'Test Item', description: 'Test Description' });
    });
  });
});




describe('ItemList', () => {
  const items = [
    { _id: 1, name: 'Item 1', description: 'Description 1' },
    { _id: 2, name: 'Item 2', description: 'Description 2' },
  ];

  test('renders items correctly', async () => {
    fetchItems.mockResolvedValue(items);
    const setItems = jest.fn();

    await act(async () => {
      render(<ItemList items={items} setItems={setItems} />);
    });

    expect(screen.getByText(/Item 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Description 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Item 2/i)).toBeInTheDocument();
    expect(screen.getByText(/Description 2/i)).toBeInTheDocument();
  });

  test('handles delete item', async () => {
    fetchItems.mockResolvedValue(items);
    deleteItem.mockResolvedValue({});
    const setItems = jest.fn();

    await act(async () => {
      render(<ItemList items={items} setItems={setItems} />);
    });

    await act(async () => {
      fireEvent.click(screen.getAllByText(/Delete/i)[0]);
    });

    await waitFor(() => {
      expect(deleteItem).toHaveBeenCalledWith(1);
      expect(setItems).toHaveBeenCalled();
    });
  });

  test('handles edit item', async () => {
    fetchItems.mockResolvedValue(items);
    updateItem.mockResolvedValue({});
    const setItems = jest.fn();

    await act(async () => {
      render(<ItemList items={items} setItems={setItems} />);
    });

    fireEvent.click(screen.getAllByText(/Edit/i)[0]);
    fireEvent.change(screen.getByDisplayValue(/Item 1/i), { target: { value: 'Updated Item 1' } });
    fireEvent.change(screen.getByDisplayValue(/Description 1/i), { target: { value: 'Updated Description 1' } });

    await act(async () => {
      fireEvent.click(screen.getByText(/Save/i));
    });

    await waitFor(() => {
      expect(updateItem).toHaveBeenCalledWith(1, { name: 'Updated Item 1', description: 'Updated Description 1' });
      expect(setItems).toHaveBeenCalled();
    });
  });
});



global.fetch = jest.fn();

afterEach(() => {
  fetch.mockClear();
});





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