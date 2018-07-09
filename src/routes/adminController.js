const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../model/user.model')
const Category = require('../model/category.model')
const Paid = require('../model/paid.model')
const Product = require('../model/product.model')

exports.sentItem = async function(req, res){
    const id = req.body.id
    await Paid.findOneAndUpdate({_id:id}, {status: "Item in this cart has been sent"})
    res.redirect("/admin/cart/"+id)
}

exports.getCart = async function(req, res){
    const id = req.params.id
    const category = req.category
    try{
        const paid = await Paid.findOne({_id:id})
        const product = await Product.find({})
        //res.json({product:product, paid:paid, user:req.user, categoryMenu:category, msg:req.msg, cart:req.cart})
        res.render('admin-cart.ejs', {product:product, paid:paid, user:req.user, categoryMenu:category, msg:req.msg, cart:req.cart})
    }catch(err){
        console.log(err)
        res.status(500).json({error:err})
    }
    
}

exports.adminProfile = function(req, res){
    const user = req.user
    const category = req.category
    res.render('admin-profile.ejs', {user:user, categoryMenu:category, msg:req.msg, cart:req.cart})
}

exports.adminLogin = function(req, res){
    //console.log(req.body)
    User.findOne({email: req.body.email, isAdmin: true})
    .exec()
    .then(function(user){
        if (user === null){
            res.render('admin-login.ejs', { message: 'invalid email' })
        }
        //console.log(user)
        bcrypt.compare(req.body.password, user.password, function(err, result){
            if(err){
                res.render('admin-login.ejs', { message: 'Unauthorized access' })
            }
            
            if(result){
                const JWTToken = jwt.sign({
                    email:user.email,
                    _id: user._id,
                    isAdmin: user.isAdmin
                },
                'secret',
                {
                    expiresIn: '2h'
                })
                res.cookie('jewete', 'WIDII '+JWTToken)
                res.redirect('/admin/profile')
            }
            res.render('admin-login.ejs', { message: 'invalid password' })
        })
    })
    .catch(error =>{
        res.status(500).json({
            error:error
        })
    })
}

exports.isAdmin = async function(req, res, next){
    //console.log(req.user)
    if(req.user.isAdmin === true){
        cart = await Paid.find({status:'not sent'})
        if (cart.length > 0){
            req.msg = "You have one or more un-managed order"
        }else{
            req.msg = ""
        }
        req.cart = cart
        next()
    }else{
        res.json({message: "you shall not pass!!!"})
    }
}

exports.isLoggedIn = function(req, res, next){
    //console.log('masuk')
    if (req.cookies.jewete){
    jwt.verify(req.cookies.jewete.split(' ')[1], 'secret', function(err, decode){
        if (err) req.user = undefined
        req.user = decode
        console.log(err)
        if (decode) {
            res.redirect('/admin/profile')
          } else {
            res.clearCookie("jewete")
            return res.status(401).json({ message: 'token expired!' });
          }
      })
    }else{
        next()
    }
}

exports.getCategory = function(req, res, next){
    Category.find({}, function(err, category){
        if (err) {
            res.status(500).json({
                error:err
            })
        }
        req.category = category
        next()
    })
}