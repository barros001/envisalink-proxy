# EnvisaLinkk Proxy

This library connects to an EnvisaLink's TPI port and allow multiple devices to connect to it concurrently.

**COMPATIBILITY NOTICE:** This library only works with Honeywell panels.

## Install

Run the following command:

```sh
npm i --save envisalink-proxy
```

## Usage

```ts
import {createProxy} from 'envisalink-proxy';

createProxy({
    envisaLink: {
        host: '127.0.0.1',
        password: 'user',
        port: 4025, // optional, defaults to 4025
        timeout: 5000, // optional, defaults to 5000
    },
    server: {
        port: 4025, // optional, defaults to 4025
        host: '0.0.0.0' // optional, defaults to '0.0.0.0'
    }
});
```
