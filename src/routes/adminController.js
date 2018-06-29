const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../model/user.model')
const Category = require('../model/category.model')
exports.adminProfile = function(req, res){
    const user = req.user
    const category = req.category
    res.render('admin-profile.ejs', {user:user, category:category})
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

exports.isAdmin = function(req, res, next){
    //console.log(req.user)
    if(req.user.isAdmin === true){
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