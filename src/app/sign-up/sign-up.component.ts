import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';
 
  


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  user = {
    userName: '',
    email: '',
    password: '' 
    
  };
  errorMessage:String='';
  successMessage:String='';
  passwordVisible: boolean = false;

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  constructor(private userService:UserServiceService, private router: Router) { }

  onSubmit() {
    this.userService.addUser(this.user)
      .subscribe(
        response => {
          console.log('User registered successfully:', response);
          this.successMessage='votre compte est crée avec succès';
          this.router.navigate(['/signIn']);
        },
        error => {
          console.error('Error registering user:', error);
          this.errorMessage='un erreur est survenu'
        }
      );
  }
   
  }

