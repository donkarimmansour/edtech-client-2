import { Component, EventEmitter, Output } from '@angular/core';
import { Quiz } from '../models';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-bar-quiz',
  templateUrl: './search-bar-quiz.component.html',
  styleUrls: ['./search-bar-quiz.component.css'] 
})
export class SearchBarQuizComponent {
  searchTerm: string = '';
  
  @Output() searchEvent = new EventEmitter<Quiz[]>();

  constructor(private http: HttpClient) {}

  onSearchInput(event: any) {
    this.searchTerm = event.target.value;
  }

  
  search() {
    this.http.get<any[]>(`http://localhost:8080/quiz/search?keywords=${this.searchTerm}`).subscribe(
      (data) => {
        this.searchEvent.emit(data); 
      },
      (error) => {
        console.error(error);
       
      }
    );
  }
}

