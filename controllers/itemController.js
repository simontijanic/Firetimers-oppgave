const Item = require('../models/item');

exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createItem = async (req, res) => {
    const newItemData = req.body;
    const item = new Item({
        name: newItemData.name,
        description: newItemData.description 
    });

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteItem = async (req, res) => {
    const itemId = req.params.id;
    try {
        const deletedItem = await Item.findByIdAndDelete(itemId);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Element ikke funnet' });
        }
        res.status(200).json({ message: 'Element slettet' });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Ugyldig ID-format' });
        }
        res.status(500).json({ message: error.message });
    }
};