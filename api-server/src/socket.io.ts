import http from 'http';
import { Server } from 'socket.io';
import { decrypting } from './utilies/encrypt.dcrypt.ts';


export const UsersConnected: any = {}


export const socketInitialize = (server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) => {
   const io = new Server(server, {
      cors: {
         origin: process.env.NODE_ENV === "development" ? "*" : undefined,
         credentials: true
      }
   })

   io.on('connection', (socket) => {

      /* UserQueryId is encrypted */
      const userQueryId = socket.handshake.query.id as string
      /* Using decrypting function to decrypt the id and store it in the state */
      const dycryotingId = decrypting(userQueryId)

      console.log('Client connected:', socket.id, userQueryId);

      if (dycryotingId) {
         UsersConnected[`${dycryotingId}`] = socket.id
      }

      socket.on('message', (data) => {
         console.log('Received from client:', data);
         socket.emit('reply', `Server received: ${data}`);
      });

      socket.on('disconnect', () => {
         console.log('Client disconnected:', socket.id);
      });
   });

   return (io)
}
