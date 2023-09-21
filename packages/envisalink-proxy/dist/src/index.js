"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProxy = void 0;
const envisalink_connection_1 = require("./envisalink-connection");
const server_1 = require("./server");
function createProxy(option) {
    const connections = [];
    const evlConnection = (0, envisalink_connection_1.createConnection)(option);
    const server = (0, server_1.createServer)(option, evlConnection);
    evlConnection.on('envisaLinkData', (data) => {
        for (const connection of connections) {
            connection.write(data);
        }
    });
    server.on('authenticated', (socket) => {
        connections.push(socket);
    });
    server.on('connectionEnd', (socket) => {
        const index = connections.indexOf(socket);
        if (index > -1) {
            connections.splice(index, 1);
        }
    });
}
exports.createProxy = createProxy;
