import { Component, EventEmitter, Output, signal } from '@angular/core';
import { User } from '@app/models/user';
import { UserService } from '@app/services';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss'
})
export class ChatListComponent {
  public userList = signal<User[]>([])

  @Output('onSelectUser') onSelectUser = new EventEmitter<User>();

  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe(users => {
      if (users && users.length) {
        this.userList.set(users.filter(usr => usr.userId !== userService.getUser()?.userId) || [])
      }

    })
  }

  openChat(user: User) {
    this.onSelectUser.emit(user)
  }

}
