const express = require('express')
const { getDashboardStats } = require('./stats.controller')
const { auth, isAdmin } = require('../../middleware/auth')

const router = express.Router()

router.get('/', auth, isAdmin, getDashboardStats)

module.exports = router