
const libraryService = require('../services/libraryService');
const { sendErrorResp } = require('../utils/response');
const path = require('path');

const loadLibrarySite = (req, res) => {
    return res.sendFile(path.join(__dirname, '..', 'views', 'libraryHome.html'));
}

const loadLibraryBookPost = (req, res) => {
    return res.sendFile(path.join(__dirname, '..', 'views', 'library.html'));
}

const loadAllBooks = (req, res) => {
    return libraryService.getAllBooks(res);
}

const postBookOnLibrary = (req, res) => {
    const { name, author } = req.body;

    if(
        typeof name !== 'string' || !name.trim() ||
        typeof author !== 'string' || !author.trim()
    ) {
        return sendErrorResp(
            res, {
                statusCode: 400,
                message: 'name & auther must be in english letters'
            }
        )
    }

    return libraryService.postBook(
        { name, author },
        res
    );
}

const returnBook = (req, res) => {
    const id = Number(req.params.id);

    if(!Number.isInteger(id) || id <= 0) {
        return sendErrorResp(
            res, {
                statusCode: 400,
                message: 'Invalid book ID!'
            }
        )
    }

    return libraryService.returnBookToLibrary({ bookId: id },res);
}

const allReturnedBooks = (req, res) => {
    return libraryService.getAllBooksFromReturn(res);
}

module.exports = {
    loadLibraryBookPost,
    loadLibrarySite,
    loadAllBooks,
    postBookOnLibrary,
    returnBook,
    allReturnedBooks
}
