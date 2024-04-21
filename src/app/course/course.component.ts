import { Component, NgModule, OnInit } from '@angular/core';
import { Matiere } from '../models/matiere';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'], 
})
export class CourseComponent implements OnInit{
  
  nomCours: String='';

  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
    
    this.route.params.subscribe(params => {
       const nomCours = params['nomCours'];
       this.nomCours = nomCours
       
    });
  }
  


course = [
    {
      id: 1,
      name: 'Cours',
      
      image: '../../assets/frc.jpg',
    },
    {
      id: 2,
      name: 'Quiz',
      
      image: '../../assets/eng.jpg',
    },
    
  ];
}
