import { io } from 'socket.io-client'

const URL = 'https://socket-backend-gsfj.onrender.com/socket'

export const socket = io(URL, {
    transports: ['websocket']
});