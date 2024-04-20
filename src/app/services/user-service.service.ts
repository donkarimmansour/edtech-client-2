import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators'; // Import the tap operator
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  constructor(private http: HttpClient) { }

  addUser(user: any): Observable<any> {
    const apiUrl = 'http://localhost:8080/users/add';
    return this.http.post(apiUrl, user);
  }

  getAuthenticatedUser(userName:string): Observable<User> {
    return this.http.get<User>( `http://localhost:8080/users/get/${userName}`);
  }

  login(loginData: any): Observable<any> {
    const apiUrl = 'http://localhost:8080/users/login'; 
    const headers = { 'Content-Type': 'application/json' };
  
    return this.http.post(apiUrl, loginData, { headers, responseType: 'text' }).pipe(
      tap((response: any) => { // Specify the type of response
        if (response) {
          sessionStorage.setItem('userName', loginData.userName);
        }
      })
    );
  }
  
  loginT(loginData: any): Observable<any> {
    const apiUrl = 'http://localhost:8080/teachers/login'; 
    const headers = { 'Content-Type': 'application/json' };
  
    return this.http.post(apiUrl, loginData, { headers, responseType: 'text' }).pipe(
      tap((response: any) => { // Specify the type of response
        if (response) {
          sessionStorage.setItem('userName', loginData.userName);
        }
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    const userName=sessionStorage.getItem('userName')
    return new Observable<boolean>(observer => {
      observer.next(!!userName); // Returns true if the token is present, false otherwise
      observer.complete();
    });
  }

  logout(): Observable<any> {
    sessionStorage.removeItem('userName'); // Remove the username from the session
    return of({}); // Use of() to return an empty Observable
  }
}