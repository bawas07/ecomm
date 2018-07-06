const stripe = require('stripe')("sk_test_R6DomV5DqGJ1gHCiU1Kdp624")
const Cart = require('../model/cart.model')
const Product = require('../model/product.model')
const Paid = require('../model/paid.model')

exports.payment = function(req, res){
    const token = req.body.stripeToken
    const {amount, cartId} = req.body
    stripe.charges.create({
        amount: amount,
        currency: "gbp",
        source: token
    }, async function(err, charge){
        if(err){
            console.log(err)
            res.status(500).json({error:err})
        }
        try{
            cart = await Cart.findOne({_id:cartId})
            cart.status = 'not sent'
            const paid = new Paid(cart)
            paid.save()
            await Cart.deleteOne({_id:cartId})
            res.redirect('/home?msg=payment')
        }catch{(err)
            console.log(err)
            res.status(500).json({
                error:err
            })
        }
        
    })
}