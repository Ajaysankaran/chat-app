export interface Message {
    conversationId: string,
    messageId: string,
    senderId: string
    content: string,
    createdDate: Date
    isMine?: boolean
}


