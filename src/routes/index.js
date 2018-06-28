var express = require('express');
var router = express.Router();
const cookieParser = require('cookie-parser')

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('Cookies: ', req.cookies.jwt)
  res.clearCookie("jwt")
  console.log('Signed Cookies: ', req.cookies)
  res.render('index', { title: 'Express' });
});

module.exports = router;
