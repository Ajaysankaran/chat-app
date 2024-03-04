import cassandraClient from "../config/db";
import { Conversations } from "../models";
import { Message } from "../models";

const INSERT_MESSAGE_SQL = `insert into chat_app.messages (conversation_id, message_id, sender_id, content, created_date) 
    values (?, ?, ?, ?, ?)`;
const GET_CONVERSATION_ID_BY_USER_SQL = 'SELECT user_id, conversation_id FROM chat_app.conversations where user_id IN ? ';
const INSERT_USER_CONVERSATION_SQL = 'INSERT INTO chat_app.conversations (conversation_id, user_id) VALUES (?, ?)'
const GET_MESSAGES_BY_CONVERSATION_ID_SQL = `
select sender_id, content, created_date from chat_app.messages where conversation_id = ? order by created_date desc;`
const GET_COUNT_BY_CONVERSATION_ID_SQL = `select count(*) from chat_app.conversations where conversation_id = ? and user_id = ?`;

const saveChats = async (message: Message) => {
    await cassandraClient.execute(INSERT_MESSAGE_SQL, [message.conversationId, message.messageId,
    message.senderId, message.content, message.createdDate])
}

const getConversationIdByUsers = async (users: string[]): Promise<Conversations[] | any[]> => {
    const result = await cassandraClient.execute(GET_CONVERSATION_ID_BY_USER_SQL, [users])
    if (result.rowLength) {
        return result.rows.map(row => (
            { userId: row.get('user_id'), conversationId: row.get('conversation_id') } as Conversations
        ));
    }
    return []
}

const getMessagesByConversationId = async (conversationId: string) => {
    const result = await cassandraClient.execute(GET_MESSAGES_BY_CONVERSATION_ID_SQL, [conversationId])
    return result.rows
}

const createConversationId = async (messageFromId: string, converationId: string) => {
   const result = await cassandraClient.execute(INSERT_USER_CONVERSATION_SQL, [converationId, messageFromId]);
   if (result.rowLength) {
       return result.rows.map(row => (
           { senderId: row.get('senderId'), content: row.get('content'), createdDate: row.get('createdDate')} as Message
       ))
   }
   return []
}

export {
    saveChats,
    getConversationIdByUsers,
    createConversationId,
    getMessagesByConversationId
}
