import Server from './app';

const server = new Server();

server.start(process.env.PORT || '5002')