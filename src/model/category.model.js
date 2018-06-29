const mongoose = require('mongoose')

const category = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    brand: {type: String, require: true},
})

module.exports = mongoose.model('Category', category)