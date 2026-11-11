const userName = prompt("What is your username?");
const password = prompt("What is your password?");

// const userName = 'Raffy';
// const password = '123';

const clientOptions = {
    query: {
        userName, password
    },
    auth: {
        userName, password
    }
}

const socket = io('http://localhost:8000', clientOptions);
// const socket2 = io('http://localhost:8000/wiki');
// const socket3 = io('http://localhost:8000/mozilla');
// const socket4 = io('http://localhost:8000/linux');

// sockets will be put into this array, in the index of their ns.id
const nameSpaceSockets = [];
const listeners = {
    nsChange: [],
    messageToRoom: [],
}

// A global variable we can update when the user clicks
// on a namespace we will use it to broadcast across the app
// (redux would be great here...)
let selectedNsId = 0;

// add a submit handler for our form
document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const newMessage = document.querySelector('#user-message').value;
    console.log(newMessage, selectedNsId);

    nameSpaceSockets[selectedNsId].emit('newMessageToRoom', {
        newMessage,
        date: Date.now(),
        avatar: 'https://via.placeholder.com/30',
        userName,
        selectedNsId
    });
    document.querySelector('#user-message').value = "";
})

// addListeners job is to manage all listeners
// added to all namespaces. This prevents listeners
// being added multiple times and makes DX better
const addListeners = (nsId) => {
    // nameSpaceSockets[ns.id] = thisNs;
    if (!listeners.nsChange[nsId]) {
        nameSpaceSockets[nsId].on('nsChange', (data) => {
            console.log('Namespace Changed!');
            console.log(data)
        })
        listeners.nsChange[nsId] = true;
    }
    // Nothing to do, the listener has been added
    if(!listeners.messageToRoom[nsId]){
        //add the nsId listener to this namespace!
        nameSpaceSockets[nsId].on('messageToRoom',messageObj=>{
            console.log(messageObj);
            document.querySelector('#messages').innerHTML += buildMessageHtml(messageObj);
        })
        listeners.messageToRoom[nsId] = true;
    }
}

socket.on('connect', () => {
    console.log('Connected!');
    socket.emit('clientConnect');
});

// listen for the nsList event from the server which gives us the namespaces
socket.on('nsList', (nsData) => {
    const activeNs = localStorage.getItem('activeNs');

    const nameSpacesContainer = document.querySelector('.namespaces');
    nameSpacesContainer.innerHTML = '';
    nsData.forEach(ns => {
        console.log(ns.id)
        // update the HTML with each ns
        let classes = `w-[40px] h-[40px] namespace p-2 rounded-full cursor-pointer duration-500 bg-[url(${ns.image})] bg-center bg-no-repeat bg-cover outline-4 outline-white`;
        nameSpacesContainer.innerHTML += `<li class="${classes}" ns="${ns.endpoint}"></li>`;

        // initialize thisNs as its index in nameSpaceSockets
        // If the connection is new, this will be null
        // If the connection has already been established, it will reconnect and remain in its spot
        // let thisNs = nameSpaceSockets[ns.id];

        if (!nameSpaceSockets[ns.id]) {
            // There is no socket at this nsId. So make a new connection!
            // join this namespace with io()
            nameSpaceSockets[ns.id] = io(`http://localhost:8000${ns.endpoint}`)
        }

        addListeners(ns.id);
        console.log(nameSpaceSockets)
    })

    Array.from(document.getElementsByClassName('namespace')).forEach(element => {
        element.addEventListener('click', () => {
            joinNs(element, nsData)
        })
    })

    const targetElement = document.querySelector(`.namespace[ns="${activeNs}"]`);

    if (!targetElement) {
        joinNs(document.getElementsByClassName('namespace')[0], nsData)
        return;
    }

    const nsValue = targetElement.getAttribute('ns');

    joinNs(targetElement, nsData)
})