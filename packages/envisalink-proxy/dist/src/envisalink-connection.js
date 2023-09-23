"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConnection = void 0;
const node_net_1 = require("node:net");
function createConnection(options) {
    let authenticated = false;
    console.debug('Connecting to EnvisaLink...');
    const evlConnection = (0, node_net_1.connect)({
        host: options.envisaLink.host,
        port: options.envisaLink.port || 4025,
    });
    console.log("Setting timeout", options.envisaLink.timeout || 5000);
    const connectionTimeoutTimer = setTimeout(() => {
        evlConnection.destroy(new Error('Connection timed out'));
    }, options.envisaLink.timeout || 5000);
    evlConnection.on('connect', () => {
        clearTimeout(connectionTimeoutTimer);
        console.debug('Connected to EnvisaLink');
    });
    evlConnection.on('data', (data) => {
        const slice = data.toString();
        switch (slice.trim()) {
            case 'Login:':
                evlConnection.write(`${options.envisaLink.password}\n`);
                break;
            case 'OK':
                console.debug('Successfully logged in');
                authenticated = true;
                break;
            case 'Timed Out!':
                throw new Error('Login timed out');
            case 'FAILED':
                throw new Error('Login failed');
            default:
                if (!authenticated) {
                    throw new Error('Unexpected packet during login');
                }
                evlConnection.emit('envisaLinkData', slice);
        }
    });
    evlConnection.on('end', () => {
        console.debug('Disconnected');
    });
    evlConnection.on('error', (err) => {
        console.error(err);
    });
    return evlConnection;
}
exports.createConnection = createConnection;
