"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const node_net_1 = require("node:net");
function createServer(option, envisaLinkConnection) {
    var _a, _b;
    const server = (0, node_net_1.createServer)((socket) => {
        let authenticated = false;
        console.debug('Client connected');
        socket.write(`Login:\n`);
        socket.on('data', (data) => {
            if (authenticated) {
                envisaLinkConnection.write(data);
                return;
            }
            // not yet authenticated
            const slice = data.toString().trim();
            if (slice !== option.envisaLink.password) {
                socket.write(`FAILED\n`);
                socket.end();
            }
            socket.write(`OK\n`);
            authenticated = true;
            server.emit('authenticated', socket);
        });
        socket.on('end', () => {
            server.emit('connectionEnd', socket);
            console.debug('client disconnected');
        });
        socket.on('error', (err) => {
            socket.end();
            console.error(err);
        });
    });
    const port = ((_a = option.server) === null || _a === void 0 ? void 0 : _a.port) || 4025;
    const host = ((_b = option.server) === null || _b === void 0 ? void 0 : _b.host) || '0.0.0.0';
    console.log(`Listening on tcp://${host}:${port}`);
    server.listen(port, host);
    return server;
}
exports.createServer = createServer;
