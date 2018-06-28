var express = require('express')
var router = express.Router()
var controller = require('../server/controller/index')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/cornwebpush', async function (req, res, next) {
  controller.cornWebPush()
  res.render('corn_web_push', { title: 'Corn Web Push' })
})

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Register' })
})

module.exports = router
