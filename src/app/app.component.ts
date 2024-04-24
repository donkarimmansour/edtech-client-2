import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from './services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'education';
  userName: string | null = '';
  userType: string | null = '';
  offCanvasMenuList: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private authService: UserServiceService
  ) {}

  ngOnInit(): void {            
    this.isLoggedIn = !!sessionStorage.getItem('userName');
    this.authService.updateLoginStatus(this.isLoggedIn)

    this.authService.getLoginStatus().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;

      if (loggedIn) {
        this.userName = sessionStorage.getItem('userName');
        this.userType = sessionStorage.getItem('userType');
      } else {
        this.userName = null;
        this.userType = null;
      }
    });
  }

  toggleMenu() {
    this.offCanvasMenuList = !this.offCanvasMenuList;
  }

  closeMenu() {
    this.offCanvasMenuList = false;
  }

  logout(): void {
    this.authService.logout();
    // Rediriger vers la page de connexion après la déconnexion
    this.router.navigate(['']);
  }
}
