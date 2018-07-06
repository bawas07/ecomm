const mongoose = require('mongoose')

const message = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, require: true},
    description: {type: String, require: true}
})

module.exports = mongoose.model('Message', message)