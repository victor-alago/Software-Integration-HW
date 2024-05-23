const Item = require('../models/Item');

const createItem = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newItem = new Item({ name, description });
    const item = await newItem.save();
    res.json(item);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports = { createItem };
