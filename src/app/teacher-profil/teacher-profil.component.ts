import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

 
  constructor(private http: HttpClient, private router: Router) { }


  teacher = {
    nom: '',
    prenom: '',
    Adresse: '',
    specialite: '',
    numeroTel: '',
    // codeProf: '',
    password: ''
  };

  response = {
    nom: '',
    prenom: '',
    Adresse: '',
    specialite: '',
    numeroTel: '',
    // codeProf: '',
    password: ''
  };


  ngOnInit(): void {
    this.userName = sessionStorage.getItem('userName'); 

   this.res_start = true

   this.getTeacher().subscribe(teacher => {
     this.teacher = teacher
      console.log(this.teacher)

      this.res_start = false

   }); 


 }
  
  onSubmit() {
    this.res_start = true

    this.updateTeacher()
      .subscribe(
        response => {
          console.log('The user has been updated successfully:', response);
          this.successMessage='Votre mise à jour a été créée avec succès';
          
          // this.getTeacher().subscribe(teacher => {

          //   this.teacher = teacher

          //   console.log(this.teacher)

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
 


  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }


  updateTeacher(): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/teachers/update/${this.userName}`, this.response);
  }


  getTeacher(): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/teachers/${this.userName}`);
  }


}
 