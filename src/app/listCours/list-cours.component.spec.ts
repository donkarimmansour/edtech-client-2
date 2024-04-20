import { ComponentFixture, TestBed } from '@angular/core/testing';

import { listCoursComponent } from './list-cours.component';

describe('listCoursComponent', () => {
  let component: listCoursComponent;
  let fixture: ComponentFixture<listCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [listCoursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(listCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
