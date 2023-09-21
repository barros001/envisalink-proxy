export interface Option {
    envisaLink: {
        host: string;
        port?: number;
        password: string;
    };
    server?: {
        host?: string;
        port?: number;
    };
};
