const firebase = require('firebase')

firebase.initializeApp({
  apiKey: 'AIzaSyCWJOdnyasNUL7xAWi83WDHihsKj92N7R8',
  authDomain: 'notification-7e499.firebaseapp.com',
  databaseURL: 'https://notification-7e499.firebaseio.com',
  projectId: 'notification-7e499',
  storageBucket: 'notification-7e499.appspot.com',
  messagingSenderId: '400202276323'
})

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore()
const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)
const userRef = db.collection('users')

function getUserByStoreId (storeId) {
  return new Promise((resolve, reject) => {
    resolve(
      userRef.doc(storeId).get()
        .then(doc => {
          if (!doc.exists) {
            console.log('No such document!')
          } else {
            console.log('Document data:', doc.data())
            return doc.data().playerId
          }
        })
        .catch(err => {
          console.log('Error getting document', err)
        })
    )
  })
}

function getAllowUser () {
  var isFirst = true
  var storeStr = ''

  return new Promise((resolve, reject) => {
    resolve(
      userRef.where('status', '==', 'allow').get()
        .then((snapshot) => {
          snapshot.forEach((collections) => {
            if (isFirst) {
              storeStr += collections.data().storeId
              isFirst = false
            } else {
              storeStr += ',' + collections.data().storeId
            }
          })
          console.log(storeStr)
          return storeStr
        })
        .catch((err) => {
          console.log('Error getting unfinished stage or No allow status', err)
        })
    )
  })
}

module.exports = {
  update: function (storeId, data) {
    userRef
      .doc(storeId)
      .update(data)
  },
  create: function (storeId, data) {
    userRef
      .doc(storeId)
      .set(data)
  }
}
