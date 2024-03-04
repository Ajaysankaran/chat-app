import express from 'express';
import * as http from 'http';
import { Server } from 'socket.io';
import { startProcessingChats } from './services/chat.service';
import { logger } from './config/logger';
import { PORT } from './config/config';
import cassandraClient from './config/db';
import chatDetailsRouter from './routes/chat-details.route';
var cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json())
app.use(chatDetailsRouter)


const server = http.createServer(app);
const io: Server<any> = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
startProcessingChats(io);

cassandraClient.connect();

server.listen(PORT)
if (server.listening) {
    logger.info("Server Started on port: " + PORT)
}
