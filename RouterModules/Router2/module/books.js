const express = require('express');
const router = express.Router();
const books = [];

router.get('/', (req, res) => {
    return res.status(200).json({
        message: `Here is the list of books!`,
        books
    })
});

router.post('/', (req, res) => {
    const { name, auother, price, rating } = req.body;

    if(
        !name ||
        typeof name !== 'string' ||
        !auother ||
        typeof auother !== 'string' ||
        !Number.isFinite(price) ||
        price <= 0 ||
        !Number.isFinite(rating) ||
        rating < 0
    ) {
        return res.status(400).json({
            message: 'Provide a valid name & auother, positive price, and non-negative rate'
        });
    }

    const book = {
        id: books.length + 1,
        name: name.trim(),
        auother: auother.trim(),
        price,
        rating
    }

    books.push(book);
    return res.status(201).json({
        message: `Book has been added!`,
        book
    });
});

module.exports = router;