var services = require('../services/index')

async function register () {
  services.init()
  services.updateUserFirestore()
  services.subscribe()
}

async function cornWebPush () {
  var strStore = await services.getAllowUser()
  var users = await services.getSellsukiData(strStore)

  services.pushNotification(users)
}

register()
cornWebPush()
