import { randomUUID } from "crypto";
import { chatRepo } from "../repos";
import { Conversations, Message } from "../models";
import { logger } from "../config/logger";

const saveChats = async (conversationId: string, senderId: string, content: string) => {
    const messageId = randomUUID();
    const chatMessage = { conversationId, messageId, senderId, content: content, createdDate: new Date() } as Message
    await chatRepo.saveChats(chatMessage);
}

const getOrCreateConversationIdByUsers = async (userFromId: string, userToId: string) => {
    if (!userFromId || !userToId) {
        throw new Error('From ID and to ID cannot be empty')
    }
    const conversationId = await chatRepo.getConversationIdByUsers(userFromId, userToId);
    if (!conversationId) {
        const conversationId = randomUUID();
        logger.info("new conversation created", conversationId)
        await chatRepo.createConversationId(userFromId, userToId, conversationId);
        return conversationId.toString()
    }
    return conversationId;
}

const getMessagesBySenderAndReceiver = async (userFromId: string, userToId: string) => {
    const conversationId = await chatRepo.getConversationIdByUsers(userFromId, userToId);
    if (conversationId) {
        const chats = await chatRepo.getMessagesByConversationId(conversationId);
        if (chats) {
            return chats.map(chat => ({
                senderId: chat.sender_id,
                content: chat.content,
                createdDate: chat.created_date,
                isMine: chat.sender_id.toString() === userFromId
            }) as Message)
        }
    }

    return []
}

const checkIfUserExists = async (id: string | undefined) => {
    return !!id
}

export {
    saveChats,
    checkIfUserExists,
    getOrCreateConversationIdByUsers,
    getMessagesBySenderAndReceiver
}
