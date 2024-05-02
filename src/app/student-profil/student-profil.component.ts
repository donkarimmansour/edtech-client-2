import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserServiceService } from '../services/user-service.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-profil',
  templateUrl: './student-profil.component.html',
  styleUrls: ['./student-profil.component.css']
})
export class StudentProfilComponent implements OnInit {

  userName: string|null = 'John';
  errorMessage:String='';
  successMessage:String='';
  res_start: boolean = false;
  passwordVisible: boolean = false;


  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  response = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };
  
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
     this.userName = sessionStorage.getItem('userName'); 

    this.res_start = true

    this.getStudent().subscribe(user => {
      this.user = user
       this.res_start = false

    }); 


  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
    this.res_start = true

    this.updateStudent()
      .subscribe(
        response => {
          console.log('The user has been updated successfully:', response);
          this.successMessage='Votre mise à jour a été créée avec succès';

          
          // this.getStudent().subscribe(user => {
          //   this.user = user
          //   console.log(this.user)

          //   this.res_start = false

          // }); 

          // this.router.navigate(['/profile']);
        },
        error => {
          console.error('An error occurred while updating the user:', error);
          this.errorMessage='un erreur est survenu'
          this.res_start = false
        }
      );
  }
 

    updateStudent(): Observable<any> {
      return this.http.put<any>(`http://localhost:8080/users/update/${this.userName}`, {...this.user, ...this.response});
    }


    getStudent(): Observable<any> {
      return this.http.get<any>(`http://localhost:8080/users/${this.userName}`);
    }


}
 