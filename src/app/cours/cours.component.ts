// import { Component, Input, OnInit } from '@angular/core';
// import { cours } from '../models/cours';
// import { Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-cours',
//   templateUrl: './cours.component.html',
//   styleUrls: ['./cours.component.css']
// })
// export class CoursComponent implements OnInit {

// @Input() nomMatiere: String | null = '';
 
// listeCours: cours[] = [];

//   constructor(private http:HttpClient,private route :ActivatedRoute) {}

//   ngOnInit(): void {
//     console.log("this is"+this.nomMatiere)
    
//     this.nomMatiere = this.route.snapshot.paramMap.get('nomMatiere');

//     this.getAllCours(this.nomMatiere).subscribe(cours => {

//       this.listeCours = cours;
      
//     });

//   } 

  
// getAllCours(nomMatiere:String|null): Observable<cours[]> {

//   return this.http.get<cours[]>(`http://localhost:8080/cours/all/${nomMatiere}`);
// }


// }
