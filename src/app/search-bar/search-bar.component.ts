import { Component, EventEmitter, Output } from '@angular/core';
import { cours } from '../models/cours';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchTerm: string = '';
  @Output() searchEvent = new EventEmitter<cours[]>(); // Ajustez ici le type de l'événement
  // @Output() searchEvent2 = new EventEmitter<Quiz[]>();

  constructor(private http: HttpClient) {}

  onSearchInput(event: any) {
    this.searchTerm = event.target.value;
  }

  search() {
    this.http.get<any[]>(`http://localhost:8080/cours/search?keywords=${this.searchTerm}`).subscribe(
      (data) => {
        this.searchEvent.emit(data); 
      },
      (error) => {
        console.error(error);
       
      }
    );
  }
  // searchQuiz() {
  //   this.http.get<any[]>(`http://localhost:8080/quiz/search?keywords=${this.searchTerm}`).subscribe(
  //     (data) => {
  //       this.searchEvent2.emit(data); 
  //     },
  //     (error) => {
  //       console.error(error);
       
  //     }
  //   );
  // }
}

