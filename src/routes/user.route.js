const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../model/user.model')
const userController = require('./userController')
const adminController = require('./adminController')
const transactionController = require('./transactionController')

router.get('/signup', userController.isLoggedIn, function(req, res, next) {
    res.render('signup.ejs', { message: '' })
  });

router.get('/logout', function(req, res){
    res.clearCookie("jewete")
    res.redirect('/')
})

router.post('/signup', userController.signUp)

router.post('/add-cart/:id', userController.loginRequired, transactionController.addCart)

//router.post('/signup', function(req, res){
//    console.log(req.body)
//    res.json(req.body)
//})

router.get('/signin', userController.isLoggedIn, function(req, res){
        res.render('login.ejs', { message: '' })
})

router.post('/signin', userController.signIn)

router.get('/home', userController.loginRequired, adminController.getCategory, userController.profile)

//router.get('/admin-profile', userController.loginRequired ,userController.isAdmin ,userController.adminProfile)

module.exports = router