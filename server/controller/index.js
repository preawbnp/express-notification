function register () {
    init()
    updateUserFirestore()
    subscribe() 
}

function cornWebPush() {
    var strStore = await getAllowUser()
    var users = await getSellsukiData(strStore)

    pushNotification(users)
}