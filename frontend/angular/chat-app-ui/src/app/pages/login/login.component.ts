import { Component } from '@angular/core';
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

  constructor(private userService: UserService, private router: Router) {

  }

  onLogin(userId: string) {
    this.userService.loginUser(userId).subscribe(res => {
      console.log(res)
      localStorage.removeItem('user')
      this.router.navigate(['/chat-home'])
    })
  }

}
