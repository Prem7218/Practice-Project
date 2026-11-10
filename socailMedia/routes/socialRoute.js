const express = require('express');
const router = express.Router();

const socailController = require('../controllers/socialControllers');

router.get('/', socailController.loadSocailMedia);

router.get('/post', socailController.allPosts);
router.post('/post', socailController.addPosts);

router.post('/post/:id', socailController.addComments);

module.exports = router;