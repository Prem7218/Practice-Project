const express = require('express');
const router =  express.Router();
const item = {
    categories: []
};

router.get('/', (req, res) => {
    let categories = item.categories;
    return res.status(200).json({
        message: 'Here is the list of all categories.',
        categories
    });
});

router.post('/', (req, res) => {
    const { name } = req.body;

    if(!name || typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({
            message: 'Please fill correct details'
        });
    }

    const categorie = {
        id: item?.categories.length + 1,
        name: name.trim()
    };

    item.categories.push(categorie);
    
    return res.status(201).json({
        message: 'A new category has been created.',
        categorie
    });
});

module.exports = router;