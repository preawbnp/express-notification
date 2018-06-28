const axios = require('axios')

module.exports = {
  getLanguage: function (playerId) {
    return new Promise((resolve, reject) => {
      resolve(
        axios.get('https://onesignal.com/api/v1/players/' + playerId + '?app_id=17056444-a80b-40d4-9388-1a9a751b0f31')
          .then(function (response) {
            return response.data.language
          })
          .catch(function (error) {
            console.log(error)
          })
      )
    })
  },

  sendNotification: function (message) {
    var headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': 'Basic ZjhhZjViNjYtYmUwZS00Zjg0LTk3NmQtYzQ1ZmM4ZDVhOGI2'
    }

    var options = {
      host: 'onesignal.com',
      port: 443,
      path: '/api/v1/notifications',
      method: 'POST',
      headers: headers
    }

    var https = require('https')
    var req = https.request(options, function (res) {
      res.on('message', function (message) {
        console.log('Response:')
        console.log(JSON.parse(message))
      })
    })

    req.on('error', function (e) {
      console.log('ERROR:')
      console.log(e)
    })

    req.write(JSON.stringify(message))
    req.end()
  },

  getPlayerId: function () {
    var playerId
    OneSignal.push(async function () {
      OneSignal.getUserId(async function (userId) {
        playerId = userId
      })
    })
    return playerId
  }
}
