const express = require('express')
const { newBook, getBook, getAllBook, deleteBook, updateBook, addReview } = require('./book.controller')
const upload = require('../../middleware/upload')
const { isAdmin, auth } = require('../../middleware/auth')

const router = express.Router();

router.post("/", upload.single('img'), auth, isAdmin, newBook);

router.get("/:id", getBook)

router.get("/", getAllBook)

router.delete("/:id", auth, isAdmin, deleteBook)

router.put("/:id", auth, isAdmin, updateBook)

router.post("/:id/review", auth, addReview)

module.exports = router