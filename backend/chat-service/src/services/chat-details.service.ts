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
    const conversationResult = await chatRepo.getConversationIdByUsers([userFromId, userToId]) as Conversations[];
    if (conversationResult.length === 0 || 
        (!conversationResult.find(conversation => conversation.userId.toString() === userFromId) ||
        !conversationResult.find(conversation => conversation.userId.toString() === userToId))) {
        
        const converationId = randomUUID();
        logger.info("new conversation created", converationId)
        await chatRepo.createConversationId(userFromId, converationId);
        await chatRepo.createConversationId(userToId, converationId);
        return converationId
    }
    return conversationResult[0].conversationId;
}

const getMessagesByReceiverId = async (userFromId: string, userToId: string) => {
    const conversationId = await getOrCreateConversationIdByUsers(userFromId, userToId);
    const chats = await chatRepo.getMessagesByConversationId(conversationId)
    if (chats) {
        return chats.map(chat => ({
            senderId: chat.sender_id,
            content: chat.content,
            createdDate: chat.created_date,
            isMine: chat.sender_id.toString() === userFromId
        }) as Message )
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
    getMessagesByReceiverId
}
