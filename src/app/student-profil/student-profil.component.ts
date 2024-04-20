import { Component } from '@angular/core';
import { User } from '../models/User';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-student-profil',
  templateUrl: './student-profil.component.html',
  styleUrls: ['./student-profil.component.css']
})
export class StudentProfilComponent {
  userName: string|null = 'John';
  lastName: string = 'Doe';
  email: string = 'john.doe@example.com';
  
  constructor(private userService:UserServiceService) { }

  ngOnInit(): void {
    this.userName=sessionStorage.getItem('userName');

  }

}
