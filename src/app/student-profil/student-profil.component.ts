import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  profileForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.minLength(8)]]
   });



  constructor(private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
     this.userName = sessionStorage.getItem('userName'); 
    this.res_start = true

    this.getStudent().subscribe(user => {

        // this.user = user;
        this.res_start = false;
        
        this.profileForm?.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password // Password field should be initialized to an empty string
        });
      },

      error => {
        console.error('An error occurred while fetching user data:', error);
        this.res_start = false;
      });

  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }


  onSubmit() {
    this.res_start = true
    this.updateStudent().subscribe(
      response => {
        console.log('The user has been updated successfully:', response);
        this.successMessage = 'Votre mise à jour a été créée avec succès';
        this.res_start = false;
        this.successMessage = '';
        this.errorMessage = '';
      },
      error => {
        console.error('An error occurred while updating the user:', error);
        this.errorMessage = 'Une erreur est survenue';
        this.successMessage = '';
        this.res_start = false;
      });

  }


    updateStudent(): Observable<any> {
      const userData = {
        ...this.profileForm.value,
       // password: (this.profileForm.get('password')?.value && this.profileForm.get('password')?.value.length >= 8) ? this.profileForm?.get('password')?.value : this.user.password
      };
      return this.http.put<any>(`http://localhost:8080/users/update/${this.userName}`, userData);
    }


    getStudent(): Observable<any> {
      return this.http.get<any>(`http://localhost:8080/users/${this.userName}`);
    }


}
 