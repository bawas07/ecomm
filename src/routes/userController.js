const express = require('express')
// const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../model/user.model')
const Product = require('../model/product.model')
const Message = require('../model/message.model')

exports.signUp = function(req, res){
    //console.log('req.body')
    User.findOne({email: req.body.email})
    .exec()
    .then(function(user){
        if (user === null){
            bcrypt.hash(req.body.password, 10, function(err, hash){
                if(err){
                    return res.status(500).json({
                        error:err
                    })
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                        isAdmin: req.body.isAdmin
                    })
                    user.save().then(function(result){
                        //console.log(result)
                        res.redirect('/signin')
                        //res.status(200).json({
                        //    success: 'New user has been created'
                        //})
                    }).catch(error => {
                        res.status(500).json({
                            error:err
                        })
                    })
                }
            })
        }else{
            res.render('signup.ejs', { message: 'someone already registered using this email' })
        }
    })
}

exports.signIn = function(req, res){
    //console.log(req.body)
    User.findOne({email: req.body.email})
    .exec()
    .then(function(user){
        if (user === null){
            res.render('login.ejs', { message: 'invalid email' })
            //return res.status(401).json({
            //    failed: "invalid email"
            //})
        }
        //console.log(user)
        bcrypt.compare(req.body.password, user.password, function(err, result){
            if(err){
                res.render('login.ejs', { message: 'Unauthorized access' })
                //return res.status(401).json({
                //    failed: 'Unauthorized access'
                //})
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
                res.redirect('/home')
                //return res.status(200).json({
                //    success: 'Welcome to the JWT Auth',
                //    token: JWTToken
                //})
            }
            res.render('login.ejs', { message: 'invalid password' })
            //return res.status(401).json({
            //    failed: 'Your password is incorrect'
            //})
        })
    })
    .catch(error =>{
        res.status(500).json({
            error:error
        })
    })
}

exports.profile = function(req, res){
    const user = req.user
    Product.find({}, function(err, product){
        if (err) {
            res.status(500).json({
                error:err
            })
        }
        res.render('user/profile.ejs', {user: user, product:product, categoryMenu:req.category, message:req.message})
        //res.status(200).json(product)
    })
    //res.render('user/profile.ejs', {user: user, categoryMenu: req.category})
    //res.status(200).json({
    //    message:'you need to login to see this'
    //})
}

exports.adminProfile = function(req, res){
    const user = req.user
    res.render('admin.profile.ejs', {user:user})
}

exports.loginRequired = function(req, res, next){
    //console.log('masuk')
    if (req.cookies.jewete){
    jwt.verify(req.cookies.jewete.split(' ')[1], 'secret', function(err, decode){
        if (err) req.user = undefined
        req.user = decode
        console.log(err)
        if (decode) {
            next();
          } else {
            res.clearCookie("jewete")
            return res.status(401).json({ message: 'Token expired please log in' });
          }
      })
    }else{
        res.redirect('/signin')
    }
}

exports.isLoggedIn = function(req,res,next){
    if (req.cookies.jewete){
        res.redirect('/home')
    }else{
        next()
    }
}

exports.isAdmin = function(req, res, next){
    //console.log(req.user)
    if(req.user.isAdmin === true){
        next()
    }else{
        res.json({message: "you shall not pass!!!"})
    }
}

exports.getMessage = function(req, res, next){
    const status = req.query.msg
    Message.findOne({name:status}, function(err, msg){
        if (err) {
            res.status(500).json({
                error:err
            })
        }
        if(msg==undefined){
            req.message=""
            next()
        }else{
            req.message = msg.description
            next()
        }
    })
}