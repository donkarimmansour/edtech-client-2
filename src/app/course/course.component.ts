import { Component, NgModule, OnInit } from '@angular/core';
import { Matiere } from '../models/matiere';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit{
  
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
  
  // course = [
  //   {
  //     id: 1,
  //     name: ' Francais',
  //     description:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
  //     image: '../../assets/frc.jpg',
  //   },
  //   {
  //     id: 2,
  //     name: 'Anglais',
  //     description:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
  //     image: '../../assets/eng.jpg',
  //   },
  //   {
  //     id: 3,
  //     name: 'Mathématiques',
  //     description:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
  //     image: '../../assets/math.jpg',
  //   },
  //   {
  //     id: 1,
  //     name: 'Physique',
  //     description:
  //       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
  //     image: '../../assets/pc.jpg',
  //   },
  // ];
}
