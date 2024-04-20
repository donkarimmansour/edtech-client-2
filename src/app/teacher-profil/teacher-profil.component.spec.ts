import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherProfilComponent } from './teacher-profil.component';

describe('TeacherProfilComponent', () => {
  let component: TeacherProfilComponent;
  let fixture: ComponentFixture<TeacherProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
