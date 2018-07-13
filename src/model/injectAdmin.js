
var User = require('./user.model');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/ecommerce')

bcrypt.hash('123', 10, function(err, hash){
    if (err) {
        console.log(err)
        res.status(500).json({
            error:err
        })
    }
    const user = User({
        _id: new mongoose.Types.ObjectId(),
        email: 'admin2@admin.com',
        password: hash,
        isAdmin: true
    })
    user.save(function(err) {
        if (err)  {
            console.log(err)};
      
        console.log('Admin created')
        console.log('email = admin2@admin.com')
        console.log('pass = 123')
      })
})