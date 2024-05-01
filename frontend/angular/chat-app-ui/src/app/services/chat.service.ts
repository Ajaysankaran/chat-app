import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Message, SocketMessage } from "../models";
import { Socket, io } from "socket.io-client";
import { UserService } from "./user.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ChatService {
    private baseUrL: string = ""
    private socket!: Socket;

    private messageSubject = new BehaviorSubject<SocketMessage | undefined>(undefined);
    public receivedMessages = this.messageSubject.asObservable();
    
    constructor(private httpClient: HttpClient, private userService: UserService) {
        this.baseUrL = localStorage.getItem("chatBaseUrl") || ""
        this.connect();
    }

    getChats(userToId: string) {
        const userFromId = this.userService.getUser()!.userId
        return this.httpClient.get<Message[]>(`${this.baseUrL}/chat?userFromId=${userFromId}&userToId=${userToId}`)
    }

    private connect() {
        this.socket = io(this.baseUrL, {
            extraHeaders:  {
                "user_id": this.userService.getUser()!.userId
            }
        })
        this.socket.emit("connection")
    }

    sendMessages(message: SocketMessage) {
        this.socket.emit('message', message)
    }

    getMessages() {
        this.socket.on('message', (message: SocketMessage) => {
            console.log("message: ", message)
            this.messageSubject.next(message)
        })
    }
}