import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
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


  constructor(private quizService:QuizService, private http: HttpClient){}
 
  handleSearchResults(results: Quiz[]) {
    this.searchResults = results;
  } 


  createquiz(cours : string){
    this.http.post<Quiz>(`http://localhost:8080/quiz/createQuiz?cours=${cours}`, null).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error('There was an error!', error);
      }
    );
}

  ngOnInit() {

      this.quizService.getAllQuiz().subscribe(quizes => {
        this.quizes = quizes;        
      });
  }


}