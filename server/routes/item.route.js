const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');
const mongoose  = require('mongoose');

router.post('/create', async (req, res) => {
    try {
    const item = await itemController.createItem(item_content=req.body);
    res.json(item);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});




router.get('/', async (req, res) => {
  try {
    const items = await itemController.readItems();
    res.json(items);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});



router.put('/update/:id', async (req, res) => {
    try {
        const item = await itemController.updateItem(id=req.params.id, item_content=req.body);
        res.json(item_content);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});




router.delete('/delete/:id', async (req, res) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        const item = await itemController.deleteItem(id);
        res.json({ msg: 'Item deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;