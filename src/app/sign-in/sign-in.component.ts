import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  loginData: { userName: string, password: string} = { userName: '', password: '' };
  errorMessage: string = '';
  successMessage: string = '';
  passwordVisible: boolean = false;
  userType: boolean = false; 
  

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    
  }
 

  constructor(private authService: UserServiceService, private router: Router) { }

  onSubmitLogin() {
    if (!this.userType) {
    
      this.authService.login(this.loginData)
        .subscribe(
          response => {
            console.log('Login successful:', response);
            this.router.navigate(['/']);

          },
          error => {
            console.error('Error during login:', error);
            this.errorMessage = 'Une erreur est survenue lors de la connexion';
            console.log(this.errorMessage)
          }
        );
    } 
    else if (this.userType) {
      
      this.authService.loginT(this.loginData) 
        .subscribe(
          response => {
            console.log('Login successful:', response);
            this.router.navigate(['/']);
          },
          error => {
            console.error('Error during login:', error);
            this.errorMessage = 'Une erreur est survenue lors de la connexion';
            console.log(this.errorMessage)
          }
        );
    }
  }
}
