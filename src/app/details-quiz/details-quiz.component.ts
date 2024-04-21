import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { Question, Quiz, QuizConfig } from '../models/index';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { ResultComponent } from '../result/result.component';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-details-quiz',
  templateUrl: './details-quiz.component.html',
  styleUrls: ['./details-quiz.component.css'],
  providers: [QuizService]
})
export class DetailsQuizComponent implements OnInit {
  // quizes!: any[];
  quiz: Quiz | null = null; 
  userType: string | null | undefined;
  // mode = 'quiz';
  // @Input() quizName: string='';
  // config: QuizConfig = {
  //   'allowBack': true,
  //   'allowReview': true,
  //   'autoMove': false,
  //   'duration': 300,
  //   'pageSize': 1,
  //   'requiredAll': false,
  //   'richText': false,
  //   'shuffleQuestions': false,
  //   'shuffleOptions': false,
  //   'showClock': false,
  //   'showPager': true,
  //   'theme': 'none'
  // };

  // private destroy$ = new Subject<void>();

  // pager = {
  //   index: 0,
  //   size: 1,
  //   count: 1
  // };
  // timer: any = null;
  // startTime!: Date;
  // endTime!: Date;
  // ellapsedTime = '00:00';
  // duration = '';

  constructor(private quizService: QuizService, private route: ActivatedRoute, private router: Router) { }
 
  ngOnInit() {

    this.userType = sessionStorage.getItem('userType');

    // this.quizService.getAllQuiz().subscribe(quizes => {

    //   this.quizes = quizes;

    //   if (this.quizes.length > 0) {
    //     this.quizName = this.quizes[0].name;

    //     console.log(this.quizes);
    //     console.log(this.quizName);
    //   }

    // });
    const name=  this.route.snapshot.params['name'];
    
    this.loadQuiz(name);
  }

  loadQuiz(quizName: string) {

    this.quizService.getQuiz(quizName)//.pipe(takeUntil(this.destroy$))
    .subscribe(quizes => {
      this.quiz = quizes;
      
    })
      
      //{

      // next: res => {
      //   if (res) {
      //     this.quiz = new Quiz(res);
      //     this.pager.count = this.quiz.questions.length;
      //     this.startTime = new Date();
      //     this.ellapsedTime = '00:00';
      //     this.timer = setInterval(() => { this.tick(); }, 1000);
      //     this.duration = this.parseTime(this.config.duration);
      //     this.mode = 'quiz';

      //     console.log(this.quiz)

      //   }
      // },

      // error: error => {
      //   console.error('Failed to load quiz:', error);
      //   // Handle error...
      // }
    //});
  }

  // ngOnDestroy() {
  //   this.destroy$.next();
  //   this.destroy$.complete();
  //   if (this.timer) {
  //     clearInterval(this.timer);
  //   }
  // }

  // tick() {
  //   const now = new Date();
  //   const diff = (now.getTime() - this.startTime.getTime()) / 1000;
  //   if (diff >= this.config.duration) {
  //     this.onSubmit();
  //   }
  //   this.ellapsedTime = this.parseTime(diff);
  // }

  // parseTime(totalSeconds: number) {
  //   let mins: string | number = Math.floor(totalSeconds / 60);
  //   let secs: string | number = Math.round(totalSeconds % 60);
  //   mins = (mins < 10 ? '0' : '') + mins;
  //   secs = (secs < 10 ? '0' : '') + secs;
  //   return `${mins}:${secs}`;
  // }

  // get filteredQuestions() {
  //   return (this.quiz?.questions) ?
  //     this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  // }

  // onSelect(question: Question, option: string) {
  //   question.selectedOption = option;

  //   if (this.config.autoMove) {
  //       this.goTo(this.pager.index + 1);
  //   }
  // }

  // goTo(index: number) {
  //   if (index >= 0 && index < this.pager.count) {
  //     this.pager.index = index;
  //     this.mode = 'quiz';
  //   }
  // }

  // isAnswered(question: Question) {
  //   return question.selectedOption ? 'Answered' : 'Not Answered';
  // }

  // isCorrect(question: Question) {
  //   return question.selectedOption === question.correct ? 'correct' : 'wrong';
  // }

  // onSubmit() {
  //   let answers = [];
  //   let correctAnswersCount = 0;
  
  //   this.quiz?.questions.forEach(x => {
  //     answers.push({ 'quizId': this.quiz?.id, 'questionId': x.id, 'answered': x.selectedOption });
  //     if (x.selectedOption === x.correct) {
  //       correctAnswersCount++;
  //     }
  //   });
  
  //   let score = correctAnswersCount + '/' + this.quiz?.questions.length;
  
  //   let navigationExtras: NavigationExtras = {
  //     state: {
  //       score: score
  //     }
  //   };
  //   console.log('Score:', score); // Add this line

  //   this.scoreService.changeScore(score); // update the score

  //   this.router.navigate(['/result']);
  // } 
}