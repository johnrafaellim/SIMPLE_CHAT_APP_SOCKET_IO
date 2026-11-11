const joinRoom = async (roomTitle, namespaceId) => {
    console.log(roomTitle, namespaceId);

    // Before
    // nameSpaceSockets[namespaceId].emit('joinRoom', roomTitle, (ackResp) => {
    //     console.log('ackResp', ackResp);
    //
    //     document.querySelector('.curr-room-num-users')
    //         .innerHTML = `${ackResp.numUsers}<i class="ri-user-3-fill"></i>`;
    //     document.querySelector('.curr-room-text')
    //         .innerHTML = roomTitle;
    // }) ;

    // After
    const ackResp = await nameSpaceSockets[namespaceId].emitWithAck('joinRoom', {roomTitle, namespaceId});
    document.querySelector('.curr-room-num-users')
        .innerHTML = `${ackResp.numUsers}<i class="ri-user-3-fill"></i>`;
    document.querySelector('.curr-room-text')
        .innerHTML = roomTitle;

    // we get back the room history in the acknowledge as well!
    document.querySelector('#messages').innerHTML = '';

    console.log(ackResp.thisRoomsHistory)
    ackResp.thisRoomsHistory.forEach(message => {
        console.log(message)
        document.querySelector('#messages').innerHTML += buildMessageHtml(message);
    })
}