const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/libraryController');

router.get('/', libraryController.loadLibrarySite);
router.get('/library', libraryController.loadAllBooks);

router.get('/library/return', libraryController.allReturnedBooks);
router.post('/library/return/:id', libraryController.returnBook);

router.get('/library/addbooks', libraryController.loadLibraryBookPost);
router.post('/library/addbooks', libraryController.postBookOnLibrary);

module.exports = router;