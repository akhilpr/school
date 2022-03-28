import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/auth-guard/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  submitted = false;
  admin = false;
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    password: ['', [Validators.required]]
  })
  constructor(public fb: FormBuilder, private route: Router,
    private service: LoginService, private _snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }
  get myForm() {
    return this.loginForm.controls;
  }
  selectAdmin() {
    this.admin = !this.admin;
  }
  register() {
    this.route.navigate(['/register'])
  }
  submit() {
    this.submitted = true;

    if (this.loginForm.valid) {
      if (this.admin) {
        const service1 = this.service.validateAdmin(this.loginForm.value).subscribe((res: any) => {
          if (res.status === '200') {
            localStorage.setItem('loggedIn', 'true')
            this.authService.LoginStatus
            this.authService.isLogin(true)
            this.authService.isAdminvalid(false)
            this.route.navigate(['/admin'])
          } else {
            this._snackBar.open('Invalid User', '', {
              duration: 3000
            });
          }
        })
        this.subscriptions.push(service1);
      } else {
        const service2 = this.service.validateUser(this.loginForm.value).subscribe((res: any) => {
          if (res.status === '200') {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('parent', JSON.stringify(res.response));
            this.authService.LoginStatus
            this.authService.isLogin(true)
            this.authService.isAdminvalid(true)
            this.route.navigate(['/parents'])
          } else {
            this._snackBar.open('Invalid User', '', {
              duration: 3000
            });
          }
        })
        this.subscriptions.push(service2);
      }

    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}
