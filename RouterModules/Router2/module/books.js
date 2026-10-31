const express = require('express');
const router = express.Router();
const books = [];

router.get('/', (req, res) => {
    return res.status(200).json({
        message: `Here is the list of books!`,
        totalBooks: books.length,
        books
    })
});

router.post('/', (req, res) => {
    const { name, author, price, rating } = req.body;

    if(
        typeof name !== 'string' ||
        !name.trim() ||
        typeof author !== 'string' ||
        !author.trim() ||
        !Number.isFinite(price) ||
        price <= 0 ||
        !Number.isFinite(rating) ||
        rating < 0
    ) {
        return res.status(400).json({
            message: 'Provide a valid name & author, positive price, and non-negative rate'
        });
    }

    const book = {
        id: books.length + 1,
        name: name.trim(),
        author: author.trim(),
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