const Item = require('../models/Item');

const updateItem = async (req, res) => {
  const { name, description } = req.body;
  try {
    let item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });

    item.name = name;
    item.description = description;
    item = await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports = { updateItem };
