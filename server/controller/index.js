var services = require('../services/index')

// async function register () {
//   services.init()
//   services.updateUserFirestore()
//   services.subscribe()
// }

// async function cornWebPush () {
//   var strStore = await services.getAllowUser()
//   var users = await services.getSellsukiData(strStore)

//   services.pushNotification(users)
// }

// console.log('controller/index.js')

// register()
// cornWebPush()
const sellsuki = require('../lib/sellsuki')

module.exports = {
  hello: function () {
    console.log('hello')
    return 'hello'
  },
  register: async function () {
    services.init()
    services.updateUserFirestore()
    services.subscribe()
  },
  cornWebPush: async function () {
    // console.log('[cornWebPush function]')
    var strStore = await services.getAllowUser()
    // var users = await sellsuki.getSellsukiData('1')
    // console.log(users)
    var users = await sellsuki.test(strStore)
    // users.data.results[0].then(function (value) {
    //   console.log(value)
    // })
    // console.log(users.data.results[0])
    services.pushNotification(users)
  }
}
