import React, { useState } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import './App.css';

function App() {
  const [items, setItems] = useState([]);

  const handleItemCreated = (newItem) => {
    setItems([...items, newItem]);
  };

  return (
    <div className="container">
      <h1>Item Management</h1>
      <ItemForm onItemCreated={handleItemCreated} />
      <h2>Items</h2>
      <ItemList items={items} setItems={setItems} />
    </div>
  );
}

export default App;
