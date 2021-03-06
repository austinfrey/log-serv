const http = require('http');
const level = require('level');
const hyperlog = require('hyperlog');
const wsock = require('websocket-stream');
const router = require('./routes')

const db = level('.ws.db');
const log = hyperlog(db, {valueEncoding: 'json'});

const server = http.createServer(router);

server.listen(5000);

const ws = wsock.createServer({server}, handle);

ws.on('connection', (socket, req) => console.log('CONNECTED'))

function handle(stream) {
  stream.pipe(log.replicate({live: true})).pipe(stream);
}
