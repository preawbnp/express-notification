const axios = require('axios')

module.exports = {
  getSellsukiData: function (storeId) {
    return new Promise((resolve, reject) => {
      resolve(
        axios.get('http://192.168.1.254:8003/store/get-store-notification?store_ids[]=' + storeId)
          .then(function (response) {
            return response.data.results
          })
          .catch(function (error) {
            console.log(error)
          })
      )
    })
  }
}
