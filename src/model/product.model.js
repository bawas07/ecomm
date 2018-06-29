const mongoose = require('mongoose')

const product = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, require: true},
    price: {type: Number, require: true},
    stock: {type: Number, require: true},
    discount: {type: Number},
    tags: [],
    category: {type: mongoose.Schema.ObjectId, ref: 'Category'},
    picture: {type: String}
})

module.exports = mongoose.model('Product', product)