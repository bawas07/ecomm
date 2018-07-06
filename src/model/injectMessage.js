const Message = require('./message.model')
const mongoose = require('mongoose')

const message1 = new Message({
    _id: new mongoose.Types.ObjectId(),
    name: 'payment',
    description: 'Your payment is successful',
})
message1.save(function(err, data){
    if (err){
        console.log(err)
    }
    console.log(data)
})