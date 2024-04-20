import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private scoreSource = new BehaviorSubject('0/0');
  currentScore = this.scoreSource.asObservable();

  constructor() { }

  changeScore(score: string) {
    this.scoreSource.next(score);
  }
}