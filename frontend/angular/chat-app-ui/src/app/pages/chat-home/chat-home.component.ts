import { Component, OnInit, signal } from '@angular/core';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { User } from '@app/models/user';
import { ChatService, UserService } from '@app/services';

@Component({
  selector: 'app-chat-home',
  standalone: true,
  imports: [ChatListComponent, ChatWindowComponent],
  templateUrl: './chat-home.component.html',
  styleUrl: './chat-home.component.scss'
})
export class ChatHomeComponent implements OnInit{


  public selectedUser: User | undefined;

  public userName = signal<string | undefined>("")

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.userName.set(this.userService.getUser()?.userName);
  }

  onSelectUser(user: any) {
    this.selectedUser = user;    
  }
  
}
