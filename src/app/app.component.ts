import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'education';
  userName:string|null="";
  userType: string|null="";
  offCanvasMenuList: boolean =  false


  constructor(private router:Router){}

  ngOnInit(): void {
    this.userName=sessionStorage.getItem('userName');
    this.userType=sessionStorage.getItem('userType');
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('userName') !== null;
  }

  toggleMenu() {    
    this.offCanvasMenuList = !this.offCanvasMenuList 
  }


  closeMenu() {    
    this.offCanvasMenuList = false
  }


  logout(): void {
    console.log(sessionStorage.getItem('userName'))
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userType');

    // Rediriger vers la page de connexion après la déconnexion
    this.router.navigate(['']);
  }

}
