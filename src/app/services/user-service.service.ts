import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators'; // Import the tap operator
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  constructor(private http: HttpClient) { }
  private loginStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  addUser(user: any): Observable<any> {
    const apiUrl = 'http://localhost:8080/users/add';
    return this.http.post(apiUrl, user);
  }

  // getAuthenticatedUser(userName:string): Observable<User> { 
  //   return this.http.get<User>( `http://localhost:8080/users/get/${userName}`);
  // }

  login(loginData: any): Observable<any> {
    const apiUrl = 'http://localhost:8080/users/login';
    const headers = { 'Content-Type': 'application/json' };

    return this.http.post(apiUrl, loginData, { headers, responseType: 'text' }).pipe(
      tap((response: any) => { // Specify the type of response
        if (response) {
          const userName = response.replace("Login successful!", '').trim();
          sessionStorage.setItem('userName', userName);
          //sessionStorage.setItem('userName', loginData.userName);
          sessionStorage.setItem('userType', "student");
          this.updateLoginStatus(true);

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
          const userName = response.replace("Login successful!", '').trim();
          sessionStorage.setItem('userName', userName);
          //sessionStorage.setItem('userName', loginData.userName);
          sessionStorage.setItem('userType', "teacher");
          this.updateLoginStatus(true);
        }
      })
    );
  }


  
  getLoginStatus(): Observable<boolean> {
    return this.loginStatusSubject.asObservable();
  }

  updateLoginStatus(status: boolean) {
    this.loginStatusSubject.next(status);
  }

  // isAuthenticated(): Observable<boolean> {
  //   const userName=sessionStorage.getItem('userName')
  //   return new Observable<boolean>(observer => {
  //     observer.next(!!userName); // Returns true if the token is present, false otherwise
  //     observer.complete();
  //   });
  // }

  logout(): Observable<any> {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userType');
    this.updateLoginStatus(false);
    return of({});
  }
}