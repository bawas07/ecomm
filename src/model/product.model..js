const mongoose = require('mongoose')

const product = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, require: true},
    description: {type: String, require: true},
    price: {type: Number, require: true},
    specification: {type: String},
    variation:{
        stock: {type: Number, require: true},
        colour: String
    },
    discount: {type: Number},
    tags: [],
    category: mongoose.Schema.Types.ObjectId,

})

module.exports = mongoose.model('Product', product)