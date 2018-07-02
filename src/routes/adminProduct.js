const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Product = require('../model/product.model')
const Category = require('../model/category.model')

exports.getAddProduct = function(req, res){
    Category.find({}, function(err, category){
        if (err) {
            res.status(500).json({
                error:err
            })
        }
        let message = ""
        if (req.query.status == "false"){
            message = "please fill starred field"
        }
        res.render('addProduct.ejs', {categoryMenu:category, message: message})
    })
}

exports.getProductId = function (req,res){
    const id = req.params.id
    Product.find({category:id}, function(err, product){
        if (err) {
            res.status(500).json({
                error:err
            })
        }
        res.render('productListItem.ejs', {product:product, categoryMenu:req.category})
        //res.json({product:product, category:req.category})
    })
}

exports.deleteProduct = function (req,res){
    const id = req.params.id
    Product.findOneAndRemove({_id:id}, function(err, product){
        if (err) {
            res.status(500).json({
                error:err
            })
        }
        res.redirect('/admin/product-list/')
    })
}

exports.deleteCategory = function (req, res){
    const id = req.params.id
    Category.findOneAndRemove({_id:id}, function(err, cat){
        if (err) {
            res.status(500).json({
                error:err
            })
        }
        res.redirect('/admin/category-list')
    })
}

exports.addProduct = function(req, res){
    if(req.body.name && req.body.price && req.body.stock){
        const product = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price,
            specification: req.body.spec,
            stock: req.body.stock,
            picture: req.body.picture,
            discount: req.body.discount,
            tags: req.body.tags.split(/[\s,]+/),
            category: req.body.category
        })
        product.save().then(function(result){
            res.redirect('/admin/profile')
        })
    }else{
        res.redirect('/admin/add-product?status=false')
    }
    
}

exports.editProduct = function(req, res){
    console.log('masuk')
    console.log(req.body)
    const {id} = req.body
    Product.findOneAndUpdate({_id:id}, {$set:{
        name: req.body.name,
        price: req.body.price,
        specification: req.body.spec,
        stock: req.body.stock,
        picture: req.body.picture,
        discount: req.body.discount,
        tags: req.body.tags.split(/[\s,]+/),
        category: req.body.category
    }}, function(err, prod){
        if (err){
            res.status(500).json({
                error:err
            })
        }
        res.redirect('/admin/product-list/')
    })    
}

exports.addCategory = function(req, res){
    const category = new Category({
        _id: new  mongoose.Types.ObjectId(),
        brand: req.body.brand
    })
    category.save().then(function(result){
        res.redirect('/admin/profile')
    }).catch(error => {
        res.status(500).json({
            error:err
        })
    })
}

exports.getEditProduct = function(req, res){
    const id = req.params.id
    Product.find({_id:id}, function(err, product){
        if (err) {
            res.status(500).json({
                error:err
            })
        }
        res.render('getEditProduct.ejs', {product:product, categoryMenu:req.category})
    })
}

exports.getEditCategory = function(req, res){
    const id = req.params.id
    Category.find({category:id}, function(err, category){
        if (err) {
            res.status(500).json({
                error:err
            })
        }
        res.json({category:category, categoryMenu:req.category})
        //res.render('getEditCategory.ejs', {category:category, categoryMenu:req.category})
    })
}

exports.productList = function(req,res){
    Product.find({}, function(err, product){
        if (err) {
            res.status(500).json({
                error:err
            })
        }
        res.render('productList.ejs', {product:product, categoryMenu:req.category})
        //res.status(200).json(product)
    })
}

exports.categoryUpdate = function(req, res){
    const {id, brand} = req.body
    Category.findOneAndUpdate({_id:id}, {$set:{brand:brand}}, function(err, cat){
        if (err){
            res.status(500).json({
                error:err
            })
        }
        res.redirect('/admin/category-list')
    })
}

exports.categoryList = function(req,res){
    Category.find({}, function(err, category){
        if (err) {
            res.status(500).json({
                error:err
            })
        }
        res.render('categoryList.ejs', {category:category, categoryMenu:req.category})
    })
}

