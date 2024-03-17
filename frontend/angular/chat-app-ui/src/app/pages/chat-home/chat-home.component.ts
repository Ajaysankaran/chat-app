import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, signal } from '@angular/core';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { User } from '@app/models/user';
import { ChatService, UserService } from '@app/services';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat-home',
  standalone: true,
  imports: [ChatListComponent, ChatWindowComponent, FormsModule],
  providers: [UserService, ChatService],
  templateUrl: './chat-home.component.html',
  styleUrl: './chat-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatHomeComponent implements OnInit{


  public selectedUser = signal<User | undefined>(undefined);

  public userName = signal<string | undefined>("")

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.userName.set(this.userService.getUser()?.userName);
  }

  onSelectUser(user: User) {
    this.selectedUser.set(user);    
  }
  
}
