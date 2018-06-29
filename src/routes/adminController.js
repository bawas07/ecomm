const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../model/user.model')

exports.adminProfile = function(req, res){
    const user = req.user
    res.render('admin.profile.ejs', {user:user})
}

exports.isAdmin = function(req, res, next){
    console.log(req.user)
    if(req.user.isAdmin === true){
        next()
    }else{
        res.json({message: "you shall not pass!!!"})
    }
}