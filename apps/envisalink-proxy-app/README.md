# EnvisaLink Proxy Initialization

This application serves as an EnvisaLink TPI port proxy, enabling concurrent connections. It leverages the [envisalink-proxy](https://github.com/barros001/envisalink-proxy) library as its underlying foundation.

**COMPATIBILITY NOTICE:** Please be aware that this library is exclusively compatible with Honeywell panels.

## Launching the Container

To launch the container, follow these steps:

```bash
$ docker pull barros001/envisalink-proxy:latest
$ docker run -d --name envisalink-proxy --restart=always -p 4025:4025 --env HOST=<EnvisaLink IP> --env PASSWORD=<EnvisaLink Password> --env PORT=4025 barros001/envisalink-proxy:latest
```

Ensure that you replace `<EnvisaLink IP>` and `<EnvisaLink Password>` with your specific EnvisaLink configuration values.
