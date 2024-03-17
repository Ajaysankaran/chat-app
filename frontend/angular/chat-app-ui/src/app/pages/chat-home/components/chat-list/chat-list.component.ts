import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/models/user';
import { UserService } from '@app/services';
import { switchMap, take, tap } from 'rxjs';

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

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.pipe(
      take(1),
      switchMap(params => {
        return this.userService.getUsers().pipe(
          take(1),
          tap(users => this.getUserListAndSetRoute(users, params))
        );
      })
    ).subscribe()
    
  }

  getUserListAndSetRoute(users: User[], params: any) {
    if (users && users.length) {
      this.userList.set(users.filter(usr => usr.userId !== this.userService.getUser()?.userId) || [])
    }
    if (params['userId']) {
      const user = this.userList().find(usr => usr.userId === params['userId']);
      if (user) {
        this.onSelectUser.emit(user)
        } else {
        this.router.navigate([], {relativeTo: this.route, queryParamsHandling: 'merge'});
      }
    }
  }

  openChat(user: User) {
    this.router.navigate([], {relativeTo: this.route, queryParams: { userId: user.userId }, queryParamsHandling: 'merge'});
    this.onSelectUser.emit(user)
  }

}