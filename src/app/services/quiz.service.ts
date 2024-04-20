import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quiz } from '../models';
import { Observable } from 'rxjs';

@Injectable()
export class QuizService {

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(url);
  }

  // getAll() {
  //   return [
  //     { id: 'data/javascript.json', name: 'JavaScript' },
  //     { id: 'data/aspnet.json', name: 'Asp.Net' },
  //     { id: 'data/csharp.json', name: 'C Sharp' },
  //     { id: 'data/designPatterns.json', name: 'Design Patterns' }
  //   ];
  // }
  getAllQuiz(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`http://localhost:8080/quiz/get`);
  
    
  }
  getQuizByMatiereId(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(`http://localhost:8080/quiz/${id}`);
  
  }
  getQuiz(quizName:String): Observable<Quiz> {
    return this.http.get<Quiz>(`http://localhost:8080/quiz/${quizName}`);
    
  }
  createquiz(cours : string){
    return this.http.post(`http://localhost:8080/quiz/generate?course=${cours}`,null);
  }

}
