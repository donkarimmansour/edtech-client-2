import { Component, Input } from '@angular/core';
import { Quiz } from '../models';

@Component({
  selector: 'app-quiz-item',
  templateUrl: './quiz-item.component.html',
  styleUrls: ['./quiz-item.component.css']
})
export class QuizItemComponent {
  @Input()
  quiz!: Quiz;


  

}
