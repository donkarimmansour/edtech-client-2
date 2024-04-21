import { Component ,OnInit} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Matiere } from '../models/matiere';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html', 
  styleUrls: ['./matiere.component.css']
})
export class MatiereComponent {

  matieres:Matiere[]=[];

  constructor(private http:HttpClient){}

  ngOnInit(): void {

    this.getAllCours().subscribe(cours => {
      this.matieres = cours;
      console.log(this.matieres)
    });

  }

  getAllCours(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(`http://localhost:8080/matieres/all`);
  }







}
