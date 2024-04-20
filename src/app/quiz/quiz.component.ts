import { Component, Input, OnInit } from '@angular/core';

import { QuizService } from '../services/quiz.service';

import { Question, Quiz, QuizConfig } from '../models/index';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ScoreService } from '../score.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService],
})
export class QuizComponent implements OnInit {
  // quizes: any[];
  quiz: Quiz | null = null;
  currentQuizIndex: number = 0;
  // mode = 'quiz';
  // @Input() quizName: string='';
  // config: QuizConfig = {
  //   'allowBack': true,
  //   'allowReview': true,
  //   'autoMove': false,  // if true, it will move to next question automatically when answered.
  //   'duration': 300,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
  //   'pageSize': 1,
  //   'requiredAll': false,  // indicates if you must answer all the questions before submitting.
  //   'richText': false,
  //   'shuffleQuestions': false,
  //   'shuffleOptions': false,
  //   'showClock': false,
  //   'showPager': true,
  //   'theme': 'none'
  // };

  // pager = {
  //   index: 0,
  //   size: 1,
  //   count: 1
  // };
  // timer: any = null;
  // startTime: Date;
  // endTime: Date;
  // ellapsedTime = '00:00';
  // duration = '';

  constructor(
    private quizService: QuizService,
    private scoreService: ScoreService,
    private route: ActivatedRoute,
    private router: Router,
    private http:HttpClient
  ) {}

  ngOnInit() {

    if (this.isLoggedIn()){

      const name = this.route.snapshot.params['name']; // Assuming you have the ID in the route parameter
      // alert(name); // Display the name in an alert
      this.loadQuiz(name);
  
    }else{
      this.router.navigate(['/login']);

    }
   
    // this.quizService.getAllQuiz().subscribe(quizes => {
    //   this.quizes = quizes;
    //   if (this.quizes.length > 0) {
    //     this.quizName = this.quizes[0].name;
    //     // this.loadQuiz(this.quizName);
    //     console.log(this.quizName);
    //   }
    // });
  }

  loadQuiz(quizName: string) {
    this.quizService.getQuiz(quizName).subscribe((res) => {
        this.quiz = new Quiz(res)         
      // console.log(this.quiz)
      // this.pager.count = this.quiz.questions.length;
      // this.startTime = new Date();
      // this.ellapsedTime = '00:00';
      // this.timer = setInterval(() => { this.tick(); }, 1000);
      // this.duration = this.parseTime(this.config.duration);
    });

    // this.mode = 'quiz';
  }


  isLoggedIn(): boolean {
    return sessionStorage.getItem('userName') !== null;
  }

  
  getStepIndices(): number[] {
    return Array.from({ length: this.quiz!.questions.length }, (_, i) => i);
  }


  calculateNote(): string {

    let correctAnswers = 0;

    for (let question of this.quiz!.questions) {

      for (let index = 0; index < question.options.length; index++) {

        const option =  question.options[index]
        if (option!.isAnswer && index === question!.selectedOption) {
           correctAnswers++;

        }

      }

    }

    // return (correctAnswers / this.quiz!.questions.length) * 10;

    return correctAnswers + '/' + this.quiz!.questions.length
  }

  nextQuiz() {
    if (this.currentQuizIndex < this.quiz!.questions.length - 1) {
      this.currentQuizIndex++;
    }
  }

  prevQuiz() {
    if (this.currentQuizIndex > 0) {
      this.currentQuizIndex--;
    }
  }

  selectOption(index: number) {
    this.quiz!.questions[this.currentQuizIndex].selectedOption = index;
  }

  finishQuiz() {
    const score = this.calculateNote();

    const data = {
      quizName: this.quiz!.name,
      score: score,
      userName: sessionStorage.getItem('userName'),
      date: this.formatDate()
    }
    
    this.getAllAttemptByUser(data).subscribe(attempt => {

      console.log('Score:', score); // Add this line

      this.scoreService.changeScore(score); // update the score
  
      this.router.navigate(['/result']);
      
    });


  }



  getAllAttemptByUser(data: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/attempts/post`, data);
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



//   tick() {
//     // const now = new Date();
//     // const diff = (now.getTime() - this.startTime.getTime()) / 1000;
//     // if (diff >= this.config.duration) {
//     //   this.onSubmit();
//     // }
//     // this.ellapsedTime = this.parseTime(diff);
//   }

//   parseTime(totalSeconds: number) {
//     // let mins: string | number = Math.floor(totalSeconds / 60);
//     // let secs: string | number = Math.round(totalSeconds % 60);
//     // mins = (mins < 10 ? '0' : '') + mins;
//     // secs = (secs < 10 ? '0' : '') + secs;
//     // return `${mins}:${secs}`;
//   }

//   get filteredQuestions() {
//     // return (this.quiz.questions) ?
//     //   this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
//     return '';
//   }

//   onSelect(question: Question, option: any) {
//     // Store the selected option in the question
//     // question.selectedOption = option;
//     // if (this.config.autoMove) {
//     //     this.goTo(this.pager.index + 1);
//     // }
//   }

//   goTo(index: number) {
//     // if (index >= 0 && index < this.pager.count) {
//     //   this.pager.index = index;
//     //   this.mode = 'quiz';
//     // }
//   }

//   isAnswered(question: Question) {
//     //  return question.selectedOption ? 'Answered' : 'Not Answered';
//   }

//   isCorrect(question: Question) {
//     // return question.selectedOption === question.correct ? 'correct' : 'wrong';
//   }

//   onSubmit() {
//     // let answers = [];
//     // this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.selectedOption }));
//     // // Post your data to the server here. answers contains the questionId and the users' answer.
//     // console.log(this.quiz.questions);
//     // this.mode = 'result';
//   }
}


