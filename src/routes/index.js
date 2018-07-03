var express = require('express');
var router = express.Router();
const cookieParser = require('cookie-parser')

const userController = require('./userController')
/* GET home page. */
router.get('/', userController.isLoggedIn, function(req, res, next) {
  res.render('index', { title: 'My Ecommerce' });
});

module.exports = router;
