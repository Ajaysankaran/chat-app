import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { chatDetailService } from ".";
import { logger } from "../config/logger";
import { InputMessage } from "../models";

class ChatService {
    chatIo: Server<any, any, DefaultEventsMap, any>

    userRoomMap = new Map<string, string>();
    userIdMap = new Map<string, string>();

    userConversationIdMap = new Map<string, string>();

    constructor(io: Server<any, any, DefaultEventsMap, any>) {
        this.chatIo = io
    }


    processMessages() {
        this.chatIo.on("connection", async socket => {

            if (socket.connected) {
                logger.info("Attempting to connect...")
                const userId = this.getUserId(socket);
                const userExistsFlag = await this.checkUserId(userId as string);
                if (!userExistsFlag) {
                    socket.disconnect();
                } else {
                    await this.listenToEvents(socket, userId)
                }
            }
        })
    }

    async listenToEvents(socket: Socket<any, any, DefaultEventsMap, any>, userId: string) {
        logger.info(`CONNECTED - userId: ${userId} | socketId: ${socket.id}`)

        if (!this.userIdMap.has(userId)) {
            this.userIdMap.set(userId, socket.id)
        }

        socket.on("adduser", () => {
            this.addUser(socket)
        })

        socket.on("message", async (message: InputMessage) => {
            logger.info(`message: ${message.messageTo} | content: ${message.content}`)
            const conversationId = await this.getConversationId(userId, message);
            const messageFrom = this.getUserId(socket)
            if (message.messageTo && message.content) {
                this.sendMessage(userId, conversationId!, socket, {...message, messageFrom})
            }
        })

        socket.on('disconnect', () => {
            logger.info(`DISCONNECTED - userId: ${userId} | socketId: ${socket.id}`)
            this.userIdMap.delete(userId)
        })
    }

    async checkUserId(userId: string) {
        if (!userId) {
            return false;
        }
        const userFlag = await chatDetailService.checkIfUserExists(userId);
        return userFlag
    }

    async getConversationId(userId: string, message: InputMessage) {
        let conversationId = this.userConversationIdMap.get(`${userId}:${message.messageTo}`);
        logger.info(`conversationId: ${conversationId}`)
        if (!conversationId) {
            conversationId = await chatDetailService.getOrCreateConversationIdByUsers(userId, message.messageTo)
            logger.info("new conversationId: %s ", conversationId);
            this.userConversationIdMap.set(`${userId}:${message.messageTo}`, conversationId!);
            this.userConversationIdMap.set(`${message.messageTo}:${userId}`, conversationId!);
        }
        return conversationId;
    }

    addUser(socket: Socket<any, any, DefaultEventsMap, any>) {
        socket.emit("adduser", socket.id)
    }

    sendMessage(userId: string, conversationId: string, socket: Socket<any, any, DefaultEventsMap, any>, message: InputMessage) {
        if (this.userIdMap.has(message.messageTo)) {
            const socketId = this.userIdMap.get(message.messageTo) as string;
            logger.info("sending to socketId", socketId)
            socket.to(socketId).emit('message', message);
        }
        chatDetailService.saveChats(conversationId, userId, message.content)
    }

    getUserId(socket: any) {
        return socket.handshake.headers['user_id'] as string;
    }
}


export function startProcessingChats(io: Server<any>) {
    const chatService = new ChatService(io)
    chatService.processMessages();
}
