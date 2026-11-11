const joinNs = (element, nsData) => {
    const nsEndpoint = element.getAttribute('ns');
    console.log(nsEndpoint);

    const clickedNs = nsData.find(row => row.endpoint === nsEndpoint);
    // global so we can submit the new message to the right place
    selectedNsId = clickedNs.id;
    const rooms = clickedNs.rooms;

    let roomList = document.querySelector('.room-list');
    roomList.innerHTML = '';

    // init firstRoom var
    let firstRoom;

    rooms.forEach((room, i) => {
        if ( i === 0) {
            firstRoom = room.roomTitle;
        }
        console.log(room)
        roomList.innerHTML += `<li data-namespace=${room.namespaceId} class="room hover:ml-1 duration-100 cursor-pointer"><i class="mr-1.5 ri-${room.privateRoom ? 'lock-fill' : 'global-fill'}"></i><span class="${room.privateRoom ? 'text-gray-400' : ''}">${room.roomTitle}</span></li>`
    })

    // init join first room
    joinRoom(firstRoom, clickedNs.id).then(() => {})

    // add click listener to each room so the client can tell the server it wants to join!
    const roomNodes = document.querySelectorAll('.room');
    Array.from(roomNodes).forEach(elem => {
        elem.addEventListener('click', (e) => {
            console.log("Someone clicked on " + e.target.innerText);
            const namespaceId = elem.getAttribute('data-namespace');
            joinRoom(e.target.innerText, namespaceId).then(() => {});
        })
    })

    localStorage.setItem('activeNs', nsEndpoint);
}