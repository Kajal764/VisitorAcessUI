import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {User} from '../component/register/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public baseUrl: 'http://localhost:8080/user';

  constructor(private httpClient: HttpClient) {
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }

  postData(data, url): Observable<any> {
    return this.httpClient.post<any>(url, data, {observe: 'response' as 'body'})
      .pipe(catchError(this.handleError));
  }

  register(data: { password: any; email: any }): Observable<any> {
    const apiUrl = 'http://localhost:8080/user/register';
    return this.postData(data, apiUrl)
      .pipe(catchError(this.handleError));
  }

  getUserList(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:8080/user/list')
      .pipe(catchError(this.handleError));
  }

  deleteUser(empId: number): Observable<any> {
    return this.httpClient.delete('http://localhost:8080/user/' + empId)
      .pipe(catchError(this.handleError));
  }

  getManagerList(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:8080/user/manager/registration-request-list')
      .pipe(catchError(this.handleError));
  }

  registrationRequest(data: { empId: number; status: boolean }) {
    const apiUrl = 'http://localhost:8080/user/registration-request';
    return this.postData(data, apiUrl)
      .pipe(catchError(this.handleError));
  }

  getUserRequestList(empId: string) {
    return this.httpClient.get<User[]>('http://localhost:8080/user/manager/registration-request/' + empId)
      .pipe(catchError(this.handleError));
  }
}
