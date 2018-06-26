function pushNotification (users) {
  users.data.results.forEach((user) => {
    var stage = ''
    var playerId = await getUserByStoreId().data().playerId
    var language = await getLanguage(playerId)
    var message

    if (user.count_product <= 1){
      stage = '1'
    } else if (user.count_product > 1 && user.count_store_payment_channel == 0) {
      stage = '2'
    } else if (user.count_store_payment_channel > 0 && user.count_store_shipping_type <= 1) {
      stage = '3'
    } else {
      userRef.doc(user.store_id).update({
        status: 'done'
      })
      return
    }
    message = createMessage(stage, playerId, language)
    sendNotification(message)
  })
}

async function createMessage(stage, playerId, language) {
  var heading = ''
  var content = ''
  var url = ''

  if(language == "th") {
    if (stage == '1') {
      heading = 'อยากเริ่มขาย ต้องเพิ่มสินค้าก่อนนะ!'
      content = 'เริ่มการขายผ่าน Sellsuki โดยการเพิ่มสินค้าในสต๊อกสินค้า'
    } else if (stage == '2') {
      heading = 'เพิ่มช่องทางชำระเงินสำหรับลูกค้าหรือยัง?'
      content = 'เพิ่มบัญชีธนาคารหรือช่องทางอื่นๆ เพื่อรับชำระเงินจากลูกค้าหลังยืนยันออเดอร์'
    } else if (stage == '3') {
      heading = 'อย่าลืมเพิ่มวิธีจัดส่งและค่าส่งสินค้าด้วยนะ'
      content = 'เพิ่มวิธีจัดส่งสินค้าพร้อมค่าจัดส่งแบบต่างๆ ให้ลูกค้าเลือกรับของได้ตามสะดวก'
    } 
  } else if(language == "en") {
    if (stage == '1') {
      heading = 'Ready to sell? let’s add your products first!'
      content = 'Add products into Sellsuki inventory to run your online store.'
    } else if (stage == '2') {
      heading = 'Have you added payment methods?'
      content = 'Provide your payment methods for money receiving.'
    } else if (stage == '3') {
      heading = 'Do not forget adding delivery options.'
      content = 'More delivery options, more customer satisfaction.'
    } 
  }
 
  var message = { 
    app_id: "17056444-a80b-40d4-9388-1a9a751b0f31",
    headings: { "en": heading },
    contents: { "en": content },
    include_player_ids: [ playerId ]
  }

  return message
}

function updateUserInFirestore() {
  //Get cookie from Sellsuki
  var storeId = '' 
  var playerId = await getUserByStoreId(storeId).data().playerId
  
  if ((playerId === null && userId !== null)) {
    console.log('No such document!')
    var adduser = user.doc(storeid).set({
      playerId: userId,
      storeId: storeid
    }); 
  } else if (userId === null){
    console.log('UserID not defind yet')
  } else if (playerId !== null && (playerId !== userId)) {
    db.collection("users").doc(storeid).update({ 
      "playerId": userId
    }).then (function() {
      console.log("Document successfully updated!")
    })
  } else if (playerId !== null) {
    console.log('have this user in data already!')
  }
}

function subscribe() {
  OneSignal.push(function() {
    // If we're on an unsupported browser, do nothing
    if (!OneSignal.isPushNotificationsSupported()) {
        return;
    }
    updateMangeWebPushSubscriptionButton();
    OneSignal.on("subscriptionChange", function(isSubscribed) {
        /* If the user's subscription state changes during the page's session, update the button text */
        updateMangeWebPushSubscriptionButton();
    });
});
}

function getSubscriptionState() {
  return Promise.all([
    OneSignal.isPushNotificationsEnabled(),
    OneSignal.isOptedOut()
  ]).then(function(result) {
      var isPushEnabled = result[0];
      var isOptedOut = result[1];
      return {
          isPushEnabled: isPushEnabled,
          isOptedOut: isOptedOut
      };
  });
}

function onManageWebPushSubscriptionButtonClicked() {
  getSubscriptionState().then(function(state) {
      if (state.isPushEnabled) {
          /* Subscribed, opt them out */
          console.log("1");
          OneSignal.setSubscription(false);
      } else {
          if (state.isOptedOut) {
              /* Opted out, opt them back in */
            OneSignal.setSubscription(true);
            console.log("2");
          } else {
              /* Unsubscribed, subscribe them (allow pop-up) */ 
              OneSignal.registerForPushNotifications();
              console.log("3");
          }
      }
  });
}