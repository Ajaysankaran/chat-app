import { AfterViewInit, Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Message, SocketMessage } from '@app/models/message';
import { User } from '@app/models/user';
import { ChatService, UserService } from 'app/services';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent implements OnInit {
  
  @Input('toUser') user: User | undefined
  private messageListElement?: ElementRef<HTMLDivElement>;

  @ViewChild('messageList', {static: false}) set content (content: ElementRef<HTMLDivElement>) {
    if (content) {
      this.messageListElement = content
      this.scrollToBottom();
    }
  }

  currentMessage = ""

  messages = signal<Message[]>([])
  

  constructor(private chatService: ChatService, private userService: UserService) {
    effect(() => {
      console.log("effect", this.user)
      this.scrollToBottom();
    });
    this.chatService.getMessages();
    this.chatService.receivedMessages.subscribe((message: SocketMessage | undefined) => {
      if (message) {
        let val = {
          content: message.content,
          isMine: false,
          senderId: "",
          receiverId: message.messageTo
        } as Message
        this.messages.update((value: Message[]) => [val, ...value])
      }
    })
  }

  ngOnInit() {

}

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['user'].currentValue) {
      this.loadMessages();
      this.scrollToBottom();
    }
  }

  loadMessages() {
    this.messages.set([])
    this.chatService.getChats(this.user?.userId || '').subscribe(res => {
      console.log(res)
      this.messages.set(res)
    })
    
  }

  scrollToBottom() {
    const maxScroll = this.messageListElement?.nativeElement.scrollHeight;
    this.messageListElement?.nativeElement.scrollTo({ top: (maxScroll || 0), behavior: 'instant' })
  }

  sendMessage() {
    let tempMessge = {
      senderId: this.userService.getUser()!.userId,
      receiverId: this.user!.userId,
      content: this.currentMessage,
      isMine: true
    }

    let socketMessage = {
      messageTo: this.user!.userId,
      content: this.currentMessage
    }

    this.chatService.sendMessages(socketMessage)

    this.messages.update((value: Message[]) => [tempMessge, ...value])
    this.currentMessage = ""
  }

}
