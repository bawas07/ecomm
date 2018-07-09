const cron = require('node-cron')
const Cart = require('../../model/cart.model')
const email = require('./sendEmail')
const Product = require('../../model/product.model')
const User = require('../../model/user.model')

exports.deleteExpiredCart = () => {
    cron.schedule('* * 6 * * *', async function(){
        try{
            let today = new Date().toDateString()
            const carts = await Cart.find({})
            for (cart of carts){
                if (cart.expired.toDateString() == today){
                    for (item of cart[0].item){
                        product = await Product.findOne({_id:item.product})
                        newStock = product.stock+1
                        await Product.findOneAndUpdate({_id:item.product}, {$set:{stock:newStock}})
                    }
                    await Cart.deleteOne({_id:cartId})
                }
            }
        }catch(err){
            console.log(err)
        }
      })
}

exports.sendEmail = function(){
    cron.schedule('* * 7 * * *', async function(){
        try{
            let total
            let temp
            let user
            const product = await Product.find({})
            const carts = await Cart.find({})
            if (carts.length > 0){
                for (cart of carts){
                    total = 0
                    temp = 0
                    user = await User.findOne({_id:cart.user})
                    for (item of cart.item){
                        temp = item.price*((100-item.discount)/100)
                        total = total + temp
                    }
                    await email.sendreminder(cart, product, total, user)
                }
            }
        }catch(err){
            console.log(err)
        }
    })
}