const mongoose = require('mongoose')

const cart = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    item: [{
        product:{type: mongoose.Schema.ObjectId, ref: 'Product'},
        price: {type: Number, require: true},
        discount: {type: Number}
    }],
    expired: {type:Date, require:true}
})

module.exports = mongoose.model('Cart', cart)