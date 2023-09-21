import type { Socket } from 'node:net';
import { createConnection } from './envisalink-connection';
import { createServer } from './server';
import type { Option } from './types';

export function createProxy(option: Option): void {
  const connections: Socket[] = [];
  const evlConnection = createConnection(option);
  const server = createServer(option, evlConnection);

  evlConnection.on('envisaLinkData', (data: string) => {
    for (const connection of connections) {
      connection.write(data);
    }
  });

  server.on('authenticated', (socket: Socket) => {
    connections.push(socket);
  });

  server.on('connectionEnd', (socket: Socket) => {
    const index = connections.indexOf(socket);

    if (index > -1) {
      connections.splice(index, 1);
    }
  });
}
