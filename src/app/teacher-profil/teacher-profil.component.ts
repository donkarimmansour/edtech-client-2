import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-teacher-profil',
  templateUrl: './teacher-profil.component.html',
  styleUrls: ['./teacher-profil.component.css']
})
export class TeacherProfilComponent implements OnInit { 
 
  userName: string|null = 'John';
  errorMessage:String='';
  successMessage:String='';
  res_start: boolean = false;
  passwordVisible: boolean = false;
  profileForm: FormGroup = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    specialite: [''],
    adresse: [''],
    numeroTel: ['', Validators.required],
    password: ['', [Validators.minLength(8)]]
   });

   constructor(private http: HttpClient, private fb: FormBuilder) { }



  ngOnInit(): void {
    this.userName = sessionStorage.getItem('userName'); 
    this.res_start = true

    this.getTeacher().subscribe(teacher => {
      this.res_start = false;

      this.profileForm.patchValue({
        nom: teacher.nom,
        prenom: teacher.prenom,
        specialite: teacher.specialite,
        adresse: teacher.adresse,
        numeroTel: teacher.numeroTel,
        password: teacher.password 
      });
      
    },

    error => {
      console.error('An error occurred while fetching user data:', error);
      this.res_start = false;
    });

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
 


  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }



  updateStudent(): Observable<any> {
    const userData = {
      ...this.profileForm.value,
    };
    return this.http.put<any>(`http://localhost:8080/teachers/update/${this.userName}`, userData);
  }


  getTeacher(): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/teachers/${this.userName}`);
  }


}
 