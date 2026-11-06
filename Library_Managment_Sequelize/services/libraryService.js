
const Library = require('../models/libraryModel');
const ReturnBooks = require('../models/returnbookModel');

const { sendErrorResp, sendSuccessResp } = require("../utils/response");

const getAllBooks = async (res) => {
    
    try {
        const books = await Library.findAll();

        if(books.length === 0) {
            return sendErrorResp(
                res, {
                    statusCode: 404,
                    message: 'No books on library'
                }
            )
        }

        return sendSuccessResp(
            res,
            200,
            'Here is all books',
            books
        );

    } catch(error) {
        return sendErrorResp(
            res, {
                statusCode: 500,
                message: 'Internal server error!'
            }
        )
    }
}

const postBook = async ({ name, author }, res) => {

    try {
        const issuedDate = new Date();

        const returnDate = new Date(issuedDate);
        returnDate.setDate(returnDate.getDate() + 10);

        const book = await Library.create({
            name, 
            author,
            issued: issuedDate,
            returns: returnDate,
            fine: 0
        });

        return sendSuccessResp(
            res, 
            201,
            'New book created!',
            book
        );

    } catch(error) {
        return sendErrorResp(
            res, {
                statusCode: 500,
                message: 'Internal server error!'
            }
        )
    }
}

const returnBookToLibrary = async ({ bookId }, res) => {

    try {
        const book = await Library.findByPk(bookId);

        if(!book.issued || !book.returns) {
            return sendErrorResp(
                res, {
                    statusCode: 404,
                    message: 'book not found!'
                }
            );
        }

        const currDate = new Date();
        const dueDate = new Date(book.returns);

        const isOverdue = currDate > dueDate;

        const fine = Number(book.fine || 0) + 
        (isOverdue ? 10 : 0);
        

        let returnedBook = await ReturnBooks.create({
            ...book.toJSON(),
            returns: currDate,
            fine,
        });

        await Library.update({
            fine: 0,
            issued: null,
            returns: null,
        }, {
            where: { bookId }
        });

        return sendSuccessResp(
            res, 
            200,
            'Book returned successfully',
            returnedBook
        );

    } catch(error) {
        console.error(error);
        return sendErrorResp(
            res, {
                statusCode: 500,
                message: 'Internal server error!'
            }
        )
    }
}

const getAllBooksFromReturn = async (res) => {
    try {
        const books = await ReturnBooks.findAll();

        return sendSuccessResp(
            res,
            200,
            'Here all returned books',
            books
        );

    } catch(error) {    
        console.error(error);
        return sendErrorResp(
            res, {
                statusCode: 500,
                message: 'Internal server error!'
            }
        )
    }
}

module.exports = {
    getAllBooks,
    postBook,
    returnBookToLibrary,
    getAllBooksFromReturn
}