function getLanguage(playerId) {

}

var sendNotification = function(message) {
  var headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Basic ZjhhZjViNjYtYmUwZS00Zjg0LTk3NmQtYzQ1ZmM4ZDVhOGI2"
  };
  
  var options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers
  };
  
  var https = require('https')
  var req = https.request(options, function(res) {  
    res.on('message', function(message) {
      console.log("Response:")
      console.log(JSON.parse(message))
    })
  })
  
  req.on('error', function(e) {
    console.log("ERROR:")
    console.log(e)
  })
  
  req.write(JSON.stringify(message))
  req.end()
}

function getPlayerId () {
  var playerId
  OneSignal.push(async function() {
    OneSignal.getUserId(async function(userId) {
      playerId = userId
    })
  })
  return playerId
}