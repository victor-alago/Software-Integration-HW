const Item = require('../models/Item');

const readItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports = { readItems };
