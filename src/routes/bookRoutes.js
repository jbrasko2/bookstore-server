const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

router.get('/', bookController.books_get_all);

router.get('/:bookId', bookController.books_get_one);

router.post('/', bookController.book_create);

router.patch('/:bookId', bookController.book_update);

router.delete('/:bookId', bookController.book_delete);

module.exports = router;
