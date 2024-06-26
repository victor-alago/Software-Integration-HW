import React, { useState } from 'react';
import { createItem } from '../services/api';
import '../App.css';

const ItemForm = ({ onItemCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newItem = await createItem({ name, description });
      onItemCreated(newItem);
      setName('');
      setDescription('');
      setError(null);
    } catch (error) {
      console.error('Error creating item:', error);
      setError('Failed to create item. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
      <input
        type="text"
        placeholder="Enter item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Enter item description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default ItemForm;