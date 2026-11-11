import Namespace from '../classes/Namespace.js';
import Room from '../classes/Room.js';

const wikiNs = new Namespace(0, 'Wikipedia', 'https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original', '/wiki');
const mozNs = new Namespace(1, 'Mozilla', 'https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png', '/mozilla');
const linuxNs = new Namespace(2, 'Linux', 'https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png', '/linux');

wikiNs.addRoom(new Room(0, 'New Articles', 0))
wikiNs.addRoom(new Room(1, 'Editors', 0))
wikiNs.addRoom(new Room(2, 'Other', 0))

mozNs.addRoom(new Room(0, 'Firefox', 1))
mozNs.addRoom(new Room(1, 'SeaMonkey', 1, true))
mozNs.addRoom(new Room(2, 'SpiderMonkey', 1))
mozNs.addRoom(new Room(3, 'Rust', 1))

linuxNs.addRoom(new Room(0, 'Debian', 2))
linuxNs.addRoom(new Room(1, 'Red Hat', 2))
linuxNs.addRoom(new Room(2, 'Ubuntu', 2))
linuxNs.addRoom(new Room(3, 'Max OS', 2))

export const namespaces = [wikiNs, mozNs, linuxNs];

