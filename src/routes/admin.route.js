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

router.post('/sent-item', userController.loginRequired, adminController.isAdmin, adminController.sentItem)

router.get('/', adminController.isLoggedIn, function(req, res, next) {
    res.render('admin-login.ejs', { message: '' })
  });

router.get('/add-category', userController.loginRequired, adminController.isAdmin, adminController.getCategory, function(req, res){
    res.render('addCategory.ejs', {categoryMenu:req.category})
})

router.get('/cart/:id', userController.loginRequired, adminController.isAdmin, adminController.getCategory, adminController.getCart)

router.post('/add-category', userController.loginRequired, adminController.isAdmin, adminProduct.addCategory)

router.get('/category-list', userController.loginRequired, adminController.isAdmin, adminController.getCategory, adminProduct.categoryList)

router.post('/edit-category', userController.loginRequired, adminController.isAdmin, adminProduct.categoryUpdate)

router.get('/add-product', userController.loginRequired, adminController.isAdmin, adminController.getCategory, adminProduct.getAddProduct)

router.post('/add-product', userController.loginRequired, adminController.isAdmin, adminProduct.addProduct)

router.get('/product-list', userController.loginRequired, adminController.isAdmin, adminController.getCategory, adminProduct.productList)

router.get('/profile', userController.loginRequired, adminController.isAdmin, adminController.getCategory, adminController.adminProfile)

router.get('/product/:id', userController.loginRequired, adminController.isAdmin, adminController.getCategory, adminProduct.getProductId)

router.get('/edit-category/:id', userController.loginRequired, adminController.isAdmin, adminController.getCategory, adminProduct.getEditCategory)

router.get('/edit-product/:id', userController.loginRequired, adminController.isAdmin, adminController.getCategory, adminProduct.getEditProduct)

router.post('/editProduct', userController.loginRequired, userController.isAdmin, adminProduct.editProduct)

router.get('/delete-product/:id', userController.loginRequired, adminController.isAdmin, adminController.getCategory, adminProduct.deleteProduct)

router.get('/delete-category/:id', userController.loginRequired, adminController.isAdmin, adminController.getCategory, adminProduct.deleteCategory)

module.exports = router