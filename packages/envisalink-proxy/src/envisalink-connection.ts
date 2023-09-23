import type { Socket } from 'node:net';
import { connect } from 'node:net';
import type { Options } from './types';

const DEFAULT_PORT = 4025;
const DEFAULT_TIMEOUT = 5000;

export function createConnection(options: Options): Socket {
  let authenticated = false;

  console.debug('Connecting to EnvisaLink...');

  const evlConnection = connect({
    host: options.envisaLink.host,
    port: options.envisaLink.port || DEFAULT_PORT,
  });

  const connectionTimeoutTimer = setTimeout(() => {
    evlConnection.destroy(new Error('Connection timed out'));
  }, options.envisaLink.timeout || DEFAULT_TIMEOUT);

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
