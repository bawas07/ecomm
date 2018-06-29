const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../model/user.model')
const userController = require('./userController')
const adminController = require('./adminController')

router.get('/profile', userController.loginRequired ,adminController.isAdmin ,adminController.adminProfile)

module.exports = router