import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseMixinComponent } from '@app/core/mixins/base';
import { DestroyMixin } from '@app/core/mixins/destroy.mixin';
import { UserMessage } from '@app/models';
import { User } from '@app/models/user';
import { ChatService, UserService } from '@app/services';
import { filter, map, switchMap, take, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-chat-list',
  standalone: true,
  imports: [],
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.scss'
})
export class ChatListComponent extends DestroyMixin(BaseMixinComponent) {
  public userList = signal<UserMessage[]>([])

  @Output('onSelectUser') onSelectUser = new EventEmitter<User>();

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute,
    private chatService: ChatService) {
    super();
    this.route.queryParams.pipe(
      take(1),
      switchMap(params => {
        return this.userService.getUsers().pipe(
          take(1),
          tap(users => this.getUserListAndSetRoute(users, params))
        );
      }),
      tap(_ => this.updateUserForNewMessages())
    ).subscribe()

  }

  updateUserForNewMessages() {
    this.chatService.receivedMessages.pipe(
      takeUntil(this.destroyed$),
      filter(message => !!message),
      tap(message => {
        const newList = [...this.userList()];
        const idx = newList.findIndex(usr => usr.userId === message!.messageFrom);
        if (idx != -1) {
          newList[idx].currentMessage = message!.content;
          // Move the user to the beginning of the list
          const movedUser = newList.splice(idx, 1)[0];
          newList.unshift(movedUser);
          this.userList.set(newList)
        }
      }),
    ).subscribe();
  }

  getUserListAndSetRoute(users: UserMessage[], params: any) {
    if (users && users.length) {
      this.userList.set(users.filter(usr => usr.userId !== this.userService.getUser()?.userId) || [])
    }
    if (params['userId']) {
      const user = this.userList().find(usr => usr.userId === params['userId']);
      if (user) {
        this.onSelectUser.emit(user)
      } else {
        this.router.navigate([], { relativeTo: this.route, queryParamsHandling: 'merge' });
      }
    }
  }

  openChat(user: User) {
    this.router.navigate([], { relativeTo: this.route, queryParams: { userId: user.userId }, queryParamsHandling: 'merge' });
    this.onSelectUser.emit(user)
  }

}