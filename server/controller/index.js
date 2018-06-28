var services = require('../services/index')

module.exports = {
  register: async function () {
    services.init()
    services.updateUserFirestore()
    services.subscribe()
  },
  cornWebPush: function () {
    services.pushNotification()
  }
}
