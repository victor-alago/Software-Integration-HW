const Item = require("../models/Item.model"); 

exports.createItem = async (item_content) => {
  const { name, description } = item_content;
  try {
    const newItem = new Item({ name, description });
    return await newItem.save();
  } catch (err) {
    return Promise.reject(err);
  }
};



exports.readItems = async () => {
  try {
    return await Item.find();
  } catch (err) {
    return Promise.reject(err);
  }
};





exports.updateItem = async (id, item_content) => {
    const { name, description } = item_content;
    try {
      let item = await Item.findByIdAndUpdate(id, { name, description }, { new: true });
      if (!item) throw new Error('Item not found');
      return item;  // Make sure to return the updated item
    } catch (err) {
      return Promise.reject(err);
    }
  };



exports.deleteItem = async (id) => {
  try {
    await Item.findByIdAndDelete(id);
  } catch (err) {
    return Promise.reject(err);
  }
};