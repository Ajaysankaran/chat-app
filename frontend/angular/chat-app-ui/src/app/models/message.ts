import { User } from "./user"

export interface Message {
    senderId: string
    receiverId: string
    content: string
    createdDate?: Date
    isMine?: boolean
}

export interface SocketMessage {
    messageFrom?: string
    messageTo: string
    content: string
}

export interface UserMessage extends User {
    currentMessage?: string
}
