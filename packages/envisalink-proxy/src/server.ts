import type { Server, Socket } from 'node:net';
import { createServer as nodeCreateServer } from 'node:net';
import type { Options } from './types';

const DEFAULT_PORT = 4025;
const DEFAULT_HOST = '0.0.0.0';

export function createServer(option: Options, envisaLinkConnection: Socket): Server {
  const server = nodeCreateServer((socket) => {
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

  const port = option.server?.port || DEFAULT_PORT;
  const host = option.server?.host || DEFAULT_HOST;

  console.log(`Listening on tcp://${host}:${port}`);
  server.listen(port, host);

  return server;
}
