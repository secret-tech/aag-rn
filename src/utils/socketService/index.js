import io from 'socket.io-client';

import { getToken } from '../auth';

window.navigator.userAgent = 'react-native';
const HOST = 'wss://aag.secrettech.io';

export default async () => {
  const token = await getToken();

  return io.connect(HOST, {
    query: { token },
    jsonp: false,
    transports: ['websocket'],
    reconnection: true
  });
};