const express = require('express')
const { getAllOrder, getOrder, newOrder, deliverOrder, deleteOrder } = require('./order.controller')
const {auth, isAdmin} = require('../../middleware/auth')

const router = express.Router()

router.get('/', getAllOrder)

router.get('/:id', getOrder)

router.post('/', auth, newOrder)

router.patch('/:id/deliver', auth, isAdmin, deliverOrder);

router.delete('/:id', auth, isAdmin, deleteOrder);

module.exports = router