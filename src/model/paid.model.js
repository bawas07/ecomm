const mongoose = require('mongoose')

const paid = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    item: [{
        product:{type: mongoose.Schema.ObjectId, ref: 'Product'},
        price: {type: Number, require: true},
        discount: {type: Number}
    }],
    status: {type:String, require:true}
})

module.exports = mongoose.model('Paid', paid)