import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentsComponent } from 'src/app/modules/parents/students/students/students.component';
import { AuthService } from '../../auth-guard/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isVisible: boolean;

  constructor(private _bottomSheet: MatBottomSheet, private route: Router, private authService: AuthService) { }
  isAdmin: Observable<string>;
  isLoggedIn: Observable<boolean>;
  ngOnInit(): void {
    this.getStatus()
  }
  openBottomSheet(): void {
    this._bottomSheet.open(StudentsComponent);
  }
  getStatus() {
    this.authService.loggedInStatus.subscribe((res: any) => {
      this.isLoggedIn = res;
    });
    this.authService.isAdmin.subscribe((res: any) => {
      this.isAdmin = res;
    });
    console.log(this.isVisible);

  }
  logOut(): void {
    this.authService.isLogin(false)
    localStorage.clear();
    this.route.navigate(['/'])
  }
}
