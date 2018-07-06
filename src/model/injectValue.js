// if our user.js file is at app/models/user.js
var Paid = require('./paid.model');
const Cart = require('./cart.model')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/ecommerce')
// create a new user called chris
const paid = Paid({
    _id: new mongoose.Types.ObjectId(),
    user : "5b34b11cc33d4b70bfbbce44",
    item : [ 
        {
            product : "5b39e4ef4a651a495cf81ad8",
            price : 79.6,
            discount : 0
        }
    ],
    status: 'not sent'
});
console.log('berjalan')
const fungsi = async function(){
    await Cart.find({}, function(err, res){
        if (err) {
            console.log(err)
        }
        console.log(res)
    })
}
fungsi()
// console.log(Cart.save())
// call the built-in save method to save to the database
paid.save(function(err) {
  if (err)  {
      console.log(err)};

  console.log('User saved successfully!')
});