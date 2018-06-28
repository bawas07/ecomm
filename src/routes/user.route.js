const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../model/user.model')
const userController = require('./userController')

router.get('/signup', function(req, res, next) {
    res.render('signup.ejs', { message: '' })
  });

router.get('/logout', function(req, res){
    res.clearCookie("jewete")
    res.redirect('/')
})

router.post('/signup', userController.signUp)

//router.post('/signup', function(req, res){
//    console.log(req.body)
//    res.json(req.body)
//})

router.get('/signin',function(req, res){
        res.render('login.ejs', { message: '' })
})

router.post('/signin', userController.signIn)

router.get('/profile', userController.loginRequired ,userController.profile)

module.exports = router