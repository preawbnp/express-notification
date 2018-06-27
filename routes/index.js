var express = require('express')
var router = express.Router()
var controller = require('../server/controller/index')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/cornwebpush', function (req, res, next) {
  var output = controller.cornWebPush()

  res.send('Output: ' + output)
  // console.log(output)
  res.render('corn_web_push', { title: 'Corn Web Push' })
})

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Register' })
  // var output = controller.hello()
  // res.send('Output: ' + output)
})

module.exports = router
