import cassandraClient from "../config/db";
import { Conversations } from "../models";
import { Message } from "../models";

const INSERT_MESSAGE_SQL = `insert into chat_app.messages (conversation_id, message_id, sender_id, content, created_timestamp) 
    values (?, ?, ?, ?, ?)`;
const GET_CONVERSATION_ID_BY_USER_SQL = 'SELECT conversation_id FROM chat_app.conversations where sender_id in ? and receiver_id in ?';
const INSERT_USER_CONVERSATION_SQL = 'INSERT INTO chat_app.conversations (conversation_id, sender_id, receiver_id) VALUES (?, ?, ?)'
const GET_MESSAGES_BY_CONVERSATION_ID_SQL = `
select sender_id, content, created_timestamp from chat_app.messages where conversation_id = ? order by created_timestamp desc;`
const GET_COUNT_BY_CONVERSATION_ID_SQL = `select count(*) from chat_app.conversations where conversation_id = ? and user_id = ?`;

const saveChats = async (message: Message) => {
    await cassandraClient.execute(INSERT_MESSAGE_SQL, [message.conversationId, message.messageId,
    message.senderId, message.content, message.createdDate])
}

const getConversationIdByUsers = async (userFromId: string, userToId: string): Promise<String | any> => {
    const users = [userFromId, userToId]
    const result = await cassandraClient.execute(GET_CONVERSATION_ID_BY_USER_SQL, [users, users])
    if (result.rowLength) {
        return result.rows[0].get('conversation_id') as string
    }
    return null
}

const getMessagesByConversationId = async (conversationId: string) => {
    const result = await cassandraClient.execute(GET_MESSAGES_BY_CONVERSATION_ID_SQL, [conversationId])
    return result.rows
}

const createConversationId = async (userFromId: string, userToId: string, converationId: string) => {
   const result = await cassandraClient.execute(INSERT_USER_CONVERSATION_SQL, [converationId, userFromId, userToId]);
   if (result.rowLength) {
       return result.rows[0].get('conversation_id')
   }
   return null;
}

export {
    saveChats,
    getConversationIdByUsers,
    createConversationId,
    getMessagesByConversationId
}
