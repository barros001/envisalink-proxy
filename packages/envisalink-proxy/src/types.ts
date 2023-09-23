export interface Options {
  envisaLink: {
    host: string;
    port?: number;
    password: string;
    timeout?: number;
  };
  server?: {
    host?: string;
    port?: number;
  };
}
