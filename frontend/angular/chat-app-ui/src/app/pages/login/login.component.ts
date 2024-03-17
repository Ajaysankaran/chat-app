import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public userName = signal<string | undefined>("");

  constructor(private userService: UserService, private router: Router) {

  }

  onLogin(userId: string | undefined) {
    if (userId) {
      this.userService.loginUser(userId!).subscribe(res => {
        localStorage.removeItem('user')
        this.router.navigate(['/chat-home'])
      })
    }
  }

  setUserName(event: any) {
    this.userName.set(event?.target?.value || "")
  }
}
