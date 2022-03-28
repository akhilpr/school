import { Component , OnInit} from '@angular/core';
import { AuthGuard } from './core/auth-guard/auth-guard.service';
import { AuthService } from './core/auth-guard/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  isVisible:boolean;
  ngOnInit(): void {
    this.getStatus();
  }
  constructor(public authService: AuthService) {

  }

   getStatus() {
    this.isVisible = this.authService.loggedInStatus.value;
    console.log(this.isVisible);
    
  }
  title = 'school';
}
