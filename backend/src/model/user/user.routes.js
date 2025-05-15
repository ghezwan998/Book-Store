const express = require('express')
const { register, toggleAdmin, login, logout, getUserInfo, getAllUsers, deleteUser } = require('./user.controller')
const {auth, isAdmin} = require('../../middleware/auth')

const router = express.Router()

router.post('/register', register)

router.patch('/:id/role', auth, isAdmin, toggleAdmin)

router.post('/login', login)

router.post('/logout', logout)

router.delete('/:id', deleteUser)

router.get('/me', auth, getUserInfo)

router.get('/', getAllUsers)

module.exports = router
