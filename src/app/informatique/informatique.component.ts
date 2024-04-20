import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScoreService } from '../score.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-informatique',
  templateUrl: './informatique.component.html',
  styleUrls: ['./informatique.component.css']
})
export class InformatiqueComponent implements OnInit {
 
  listAttempts: any;

  constructor(private http:HttpClient, private route:ActivatedRoute) { }

  ngOnInit() { 

    const name = this.route.snapshot.paramMap.get('username');


    this.getAllAttemptByUser(name).subscribe(attempts => {

      this.listAttempts = attempts;

      console.log(attempts);
      
      
    });

  }


  getAllAttemptByUser(name: String | null ): Observable<any> {

    return this.http.get<any>(`http://localhost:8080/attempts/${name}`);
  }

}