import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {VisitorRequest} from '../models/VisitorRequest';
import {ODCList} from '../models/ODCList';
import {User} from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  raiseOdcRequest(visitorRequest: VisitorRequest) {
   // alert(JSON.stringify(visitorRequest));
    const body = JSON.stringify(visitorRequest);
    console.log('body ');
    console.log(body);
    const options = {
      headers: new HttpHeaders({
        'content-Type': 'application/json'
      })
    };
    return this.httpClient.post<VisitorRequest>('http://localhost:8080/user/raiseOdcRequest', body, options);
  }

  getUserRequest(empId: string): Observable<VisitorRequest[]> {
    return this.httpClient.get<VisitorRequest[]>('http://localhost:8080/user/viewUserRequests/' + empId);
  }

  getAllODC(): Observable<ODCList[]> {
    return this.httpClient.get<ODCList[]>('http://localhost:8080/user/odcList');
  }

  getPendingVisitorRequest(empId: string): Observable<VisitorRequest[]> {
    const url = 'http://localhost:8080/user/pendingVisitorRequest/' + empId;
    console.log(url);
    return this.httpClient.get<VisitorRequest[]>(url);
  }

  approveOdcRequest(visitorRequest: VisitorRequest) {
    const body = JSON.stringify(visitorRequest);
    const options = {
      headers: {
        'content-Type': 'application/json'
      }
    };
    return this.httpClient.post<boolean>('http://localhost:8080/user/approveAccess', body, options);
  }

  rejectOdcRequest(visitorRequest: VisitorRequest) {
    const body = JSON.stringify(visitorRequest);
    const options = {
      headers: {
        'content-Type': 'application/json'
      }
    };
    return this.httpClient.post<boolean>('http://localhost:8080/user/rejectAccess', body, options);
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

  managers(): Observable<any> {
    const url = 'http://localhost:8080/user/managerList';
    return this.httpClient.get<User[]>(url)
      .pipe(catchError(this.handleError));
  }

  addOdc(data: { odcId: number; odcName: any }): Observable<any> {
    const apiUrl = 'http://localhost:8080/user/addOdc';
    return this.postData(data, apiUrl)
      .pipe(catchError(this.handleError));
  }

  deleteODC(odcName: string) {
    return this.httpClient.delete('http://localhost:8080/user/deleteOdc/' + odcName)
      .pipe(catchError(this.handleError));
  }
}
