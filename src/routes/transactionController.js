const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../model/user.model')
const Product = require('../model/product.model')
const Cart = require('../model/cart.model')

exports.seeCart = function(req,res){
    const userId = req.user._id
    let total = 0
    let temp = 0
    Cart.findOne({user: userId}, function(err, cart){
        if(!cart){
            res.redirect('/')
        }else{
        if (err) {
            console.log(err)
            res.status(500).json({
                error:err
            })
        }
        for (item of cart.item){
            temp = item.price*((100-item.discount)/100)
            total = total + temp
        }
        Product.find({}, function(err, prod){
            if (err){
                console.log(err)
                res.status(500).json({
                    error:err
                })
            }
            //res.json({cart:cart, prod:prod})
            res.render('user/cart.ejs', {total:total, cart:cart, product:prod, user:req.user, categoryMenu: req.category})
        })}
        //res.json(cart)
    })
    // res.json(req.user)
}

exports.deleteCart = async function(req, res){
    const cartId = req.params.id
    try{
        let cart, product, newStock
        cart = await Cart.find({_id:cartId})
        
        for (item of cart[0].item){
            product = await Product.findOne({_id:item.product})
            newStock = product.stock+1
            await Product.findOneAndUpdate({_id:item.product}, {$set:{stock:newStock}})
        }
        await Cart.deleteOne({_id:cartId})
        res.redirect('/home?msg=cartdel')
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
    // await Cart.findById(cartId, async function(err, cart){
    //     if (err){
    //         console.log(err)
    //         res.status(500).json({
    //             error:err
    //         })
    //     }
    //     for(item of cart.item){
    //         await stockAdding(item.product)
    //     }
    // })
    // await Cart.deleteOne({ _id: cartId }, function (err) {
    //     if (err) {
    //         console.log(err)
    //         res.status(500).json({
    //             error:err
    //         })
    //     }
    //     res.redirect('/')
    //   })
}

exports.deleteItem = function(req, res){
    const {id, item, product} = req.body
    Cart.findByIdAndUpdate(id, {$pull:{item:{_id:item}}}, async function(err, doc){
        await stockAdding(product)
        await res.redirect('/cart')
    })
}

exports.addCart = function(req, res){
    const userid = req.params.id
    const {product, price, discount} = req.body
    const expired = new Date()
    expired.setDate(expired.getDate()+5)
    Cart.findOne({user: userid}, function(err, doc){
        if (doc){
            const item = {
                product:product,
                price:price,
                discount:discount
            }
            
            Cart.findOneAndUpdate({user:userid}, {$push:{item:item}},function(err,doc){
                if (err){
                    console.log(err)
                }
                stockUpdate(product)
                res.redirect('/home?msg=addCart')
            })
            
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
            newCart.save(function(err){
                if(err){
                    console.log(err)
                    res.status(500).json({
                        error:err
                    })
                }else{
                    stockUpdate(product)
                    res.redirect('/')
                }              
            })
        }
    })
}

const stockAdding = function(productId){
    Product.find({_id:productId}, function(err, doc){
        if (err){
            console.log(err)
        }
        const newStock = doc[0].stock+1
        Product.findOneAndUpdate({_id:productId}, {$set:{stock:newStock}}, function(err, res){
            if (err){
                console.log(err)
            }
        })
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
    })
}