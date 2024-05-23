const express = require('express');
const router = express.Router();
const { createItem } = require('../services/createItem');
const { readItems } = require('../services/readItems');
const { updateItem } = require('../services/updateItem');
const { deleteItem } = require('../services/deleteItem');

// Create an item
router.post('/create/', createItem);

// Read all items
router.get('/', readItems);

// Update an item
router.put('/update/:id', updateItem);

// Delete an item
router.delete('/delete/:id', deleteItem);

module.exports = router;
