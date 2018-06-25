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
  
}