import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  score: string = '0/0';
  userName: string | null = 'username';

  constructor(private router: Router, private scoreService: ScoreService) { }

  ngOnInit() { 
  
    this.userName = sessionStorage.getItem('userName')

    this.scoreService.currentScore.subscribe(score => {
      console.log('Received score:', score); // Add this line
      
      this.score = score;

    });

  }


  formatDate = () => {
      // Create an Intl.DateTimeFormat object with desired options
      const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

      // Format the date using the formatter
      const parts = formatter.formatToParts(new Date());

      // Extract day, month, and year from the formatted parts
      const day = parts.find(part => part.type === 'day')?.value;
      const month = parts.find(part => part.type === 'month')?.value;
      const year = parts.find(part => part.type === 'year')?.value;

      // Combine the parts to form the desired format
      return `${day} ${month} ${year}`;
  };

} 