import io from 'socket.io-client';

import { getToken } from '../auth';

window.navigator.userAgent = 'react-native';
const HOST = 'wss://aag.secrettech.io';

const createSocket = () => getToken().then((token) => {
  return io.connect(HOST, {
    query: { token },
    jsonp: false,
    transports: ['websocket'],
    reconnection: true
  });
});

createSocket().then((socket) => {
  global.socket = socket;
});
