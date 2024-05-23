const Item = require('../models/Item');

const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item.userId === req.body.id) {
        await item.deleteOne();
        res.status(200).json("Item has been deleted");
    }
    
   else {
    return next(
      handleError(500, "You can have to login to delete your tweet")
    );
    }
  }catch (err) {
    res.status(500).send('Server Error');
  }
};

module.exports = { deleteItem };
