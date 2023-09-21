import { createProxy } from 'envisalink-proxy';
import 'dotenv/config';

createProxy({
  envisaLink: {
    host: process.env.HOST || '127.0.0.1',
    password: process.env.PASSWORD || 'password',
    port: process.env.PORT ? parseInt(process.env.PORT) : 4025,
  },
});
