const express = require('express')
const router = express.Router()
// const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const stripe = require('stripe')("sk_test_R6DomV5DqGJ1gHCiU1Kdp624")
// public key = pk_test_Y7GnsU9LuAWTeynjNRKJjFRJ

const User = require('../model/user.model')
const userController = require('./userController')
const adminController = require('./adminController')
const transactionController = require('./transactionController')
const paymentController = require('./paymentController')

router.get('/signup', userController.isLoggedIn, function(req, res, next) {
    res.render('signup.ejs', { message: '' })
  });

router.get('/logout', function(req, res){
    res.clearCookie("jewete")
    res.redirect('/')
})

router.post('/payment', userController.loginRequired, paymentController.payment)

router.post('/signup', userController.signUp)

router.post('/add-cart/:id', userController.loginRequired, transactionController.addCart)

router.post('/delete-from-cart', userController.loginRequired, transactionController.deleteItem)

router.get('/cart', userController.loginRequired, adminController.getCategory, transactionController.seeCart)

router.get('/delete-from-cart/:id', userController.loginRequired, transactionController.deleteCart)

router.get('/signin', userController.isLoggedIn, function(req, res){
        res.render('login.ejs', { message: '' })
})

router.post('/signin', userController.signIn)

router.get('/home', userController.loginRequired, adminController.getCategory, userController.getMessage ,userController.profile)

router.get('/category/:id', userController.loginRequired, adminController.getCategory, userController.getProductId)

module.exports = router