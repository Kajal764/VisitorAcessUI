import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

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
    const apiUrl: String = 'http://localhost:8080/user/register';
    return this.postData(data, apiUrl)
      .pipe(catchError(this.handleError));
  }

}
