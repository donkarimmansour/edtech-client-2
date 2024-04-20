import { Component, OnInit } from '@angular/core';

import { UserServiceService } from '../services/user-service.service';
import { cours } from '../models/cours';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './list-cours.component.html',
  styleUrls: ['./list-cours.component.css']
})
export class listCoursComponent implements OnInit {
  successMessage:String='';
  errorMessage:String='';
  searchResults: cours[] = [];
  listeCours: cours[] = [];
  nomMatiere: String | null = '';
 
  constructor(private http:HttpClient, private route:ActivatedRoute){}

  handleSearchResults(results: cours[]) {  
    this.searchResults = results;
  } 
  
  ngOnInit() {
    
    // this.route.params.subscribe(params => {
    //   const nomMatiere = params['nomMatiere'];
    //   console.log('Nom de la matière ppppp:', nomMatiere);
    //   this.nomMatiere= nomMatiere
      
    // });

    this.nomMatiere = this.route.snapshot.paramMap.get('nomMatiere');


    this.getAllCours(this.nomMatiere).subscribe(cours => {

      this.listeCours = cours;
      
    });
  }


  getAllCours(nomMatiere:String|null): Observable<cours[]> {

    return this.http.get<cours[]>(`http://localhost:8080/cours/all/${nomMatiere}`);
  }
  
     
}
