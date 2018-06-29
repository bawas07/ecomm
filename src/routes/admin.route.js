const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../model/user.model')
const userController = require('./userController')
const adminController = require('./adminController')
const adminProduct = require('./adminProduct')

router.post('/', adminController.adminLogin)

router.get('/', adminController.isLoggedIn, function(req, res, next) {
    res.render('admin-login.ejs', { message: '' })
  });

router.get('/add-category', userController.loginRequired, adminController.isAdmin, adminController.getCategory, function(req, res){
    res.render('addCategory.ejs', {category:req.category})
})

router.post('/add-category', userController.loginRequired, adminController.isAdmin, adminProduct.addCategory)

router.get('/category-list', userController.loginRequired, adminController.isAdmin, adminController.getCategory, adminProduct.categoryList)

router.get('/add-product', userController.loginRequired, adminController.isAdmin, adminController.getCategory, adminProduct.getAddProduct)

router.post('/add-product', userController.loginRequired, adminController.isAdmin, adminProduct.addProduct)

router.get('/product-list', userController.loginRequired, adminController.isAdmin, adminController.getCategory, adminProduct.productList)

router.get('/profile', userController.loginRequired, adminController.isAdmin, adminController.getCategory, adminController.adminProfile)

router.get('/product/:id', userController.loginRequired, adminController.isAdmin, adminController.getCategory, adminProduct.getProductId)

module.exports = router