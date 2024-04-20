import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarQuizComponent } from './search-bar-quiz.component';

describe('SearchBarQuizComponent', () => {
  let component: SearchBarQuizComponent;
  let fixture: ComponentFixture<SearchBarQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBarQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBarQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
