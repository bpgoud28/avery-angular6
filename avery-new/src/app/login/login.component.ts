import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public user = {};
  public isLoggedIn: boolean;
  public credentialsError: boolean;
  constructor(private _authService : AuthService, private router: Router ) {
    this.user = {
      userEmail : '',
      password : ''
    }
    this.credentialsError = false;
  }

  ngOnInit() {

  }

  //
  public login() {
    this._authService.isLoggedIn().subscribe(response => {
      this.isLoggedIn;
    });
  }

  //
  public submitLogin() {
    this._authService.isLoggedIn().subscribe(response => {
      if(this.user.userEmail == response.email && this.user.password == response.password) {
        this.router.navigate(['/dashboard']);
      } else {
        this.credentialsError = true;
      }
    });
    //
  }

}
