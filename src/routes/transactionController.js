const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../model/user.model')
const Product = require('../model/product.model')
const Cart = require('../model/cart.model')

exports.addCart = function(req, res){
    console.log(req.body)
    const userid = req.params.id
    const {product, price, discount} = req.body
    const expired = new Date()
    expired.setDate(expired.getDate()+5)
    Cart.findOne({user: userid}, async function(err, doc){
        if (doc){
            const item = {
                product:product,
                price:price,
                discount:discount
            }
            
            await Cart.findOneAndUpdate({user:userid}, {$push:{item:item}},function(err,doc){
                if (err){
                    console.log(err)
                }
            })

            await stockUpdate(product)
        }else{
            let newCart = Cart({
                _id: new mongoose.Types.ObjectId(),
                user: userid,
                item: [{
                    product:product,
                    price:price,
                    discount:discount,
                    expired:expired
                }]
            })

            await stockUpdate(product)

            await newCart.save(function(err){
                if(err){
                    console.log(err)
                }else{
                    console.log('data saved')
                }              
            })
        }
    })
}

const stockUpdate = function(productId){
    Product.find({_id:productId}, function(err, doc){
        if (err){
            console.log(err)
        }
        const newStock = doc[0].stock-1
        Product.findOneAndUpdate({_id:productId}, {$set:{stock:newStock}}, function(err, res){
            if (err){
                console.log(err)
            }
        })
        console.log(doc)
    })
}