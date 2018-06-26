var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('corn_web_push', { title: 'Corn Web Push' })
})

module.exports = router
