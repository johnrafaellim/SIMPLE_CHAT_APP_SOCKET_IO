export default class Room {
    constructor(roomId, roomTitle, namespaceId, privateRoom = false) {
        this.roomId = roomId;
        this.roomTitle = roomTitle;
        this.namespaceId = namespaceId;
        this.privateRoom = privateRoom;
        this.history = [];
    }

    addMessage(message) {
        // if (this.history.length > 1000) {
        // }
        this.history.push(message)
    }

    clearHistory() {
        this.history = [];
    }
}