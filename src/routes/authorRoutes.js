const express = require('express')
const authorController = require('../controllers/authorController')

const router = express.Router()

router.get('/', authorController.authors_get_all)

router.get('/:authorId', authorController.authors_get_one)

router.post('/', authorController.author_create)

router.patch('/:authorId', authorController.author_update)

router.delete('/:authorId', authorController.author_delete)

module.exports = router
