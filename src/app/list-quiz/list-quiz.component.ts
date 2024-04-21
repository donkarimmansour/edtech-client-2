import { Component, OnInit } from '@angular/core';
import { Quiz } from '../models';
import { QuizService } from '../services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.css']
})
export class ListQuizComponent implements OnInit {
  successMessage:String='';
  errorMessage:String=''; 
  searchResults: Quiz[] = [];
  quizes:Quiz[]=[]
  coursName: string='';
  matiere_id: String | null = '';
  res_start: boolean = false;


  constructor(private quizService:QuizService, private http: HttpClient, private route:ActivatedRoute){}
 
  handleSearchResults(results: Quiz[]) {
    this.searchResults = results;
  } 


  createquiz(cours : string){

    this.res_start = true
    
   this.http.get<Quiz>(`http://localhost:8080/quiz/createQuiz?cours=${cours}&matiere_id=${this.matiere_id}`).subscribe(
      response => {
        //console.log('data!',response);
        this.res_start = true
        window.location.reload();

      },
      error => {
        console.error('There was an error!', error);
      }
    );
}

  ngOnInit() {


    this.matiere_id = this.route.snapshot.paramMap.get('matiere_id');    

      this.quizService.getAllQuiz(this.matiere_id).subscribe(quizes => {
        this.quizes = quizes;        
      });
  }


}