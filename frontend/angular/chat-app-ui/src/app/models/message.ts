export interface Message {
    senderId: string
    receiverId: string
    content: string
    createdDate?: Date
    isMine?: boolean
}

export interface SocketMessage {
    messageTo: string
    content: string
}
