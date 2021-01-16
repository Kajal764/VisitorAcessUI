import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {VisitorRequest} from '../models/VisitorRequest';
import {ODCList} from '../models/ODCList';
import {User} from '../models/User';
import { AssetList } from '../models/AssetList';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseurl = 'http://localhost:8080/visitor/user/';

  constructor(private httpClient: HttpClient) {
  }

  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }

  postData(data, url): Observable<any> {
    return this.httpClient.post<any>(url, data, {observe: 'response' as 'body'})
      .pipe(catchError(this.handleError));
  }

  register(data): Observable<any> {
    const apiUrl = this.baseurl + '/register';
    return this.postData(data, apiUrl)
      .pipe(catchError(this.handleError));
  }

  raiseOdcRequest(visitorRequest: VisitorRequest) {
    const body = JSON.stringify(visitorRequest);
    console.log('body ');
    console.log(body);
    const options = {
      headers: new HttpHeaders({
        'content-Type': 'application/json'
      })
    };
    return this.httpClient.post<VisitorRequest>(this.baseurl + '/raiseOdcRequest', body, options);
  }

  getUserRequest(empId: string): Observable<VisitorRequest[]> {
    return this.httpClient.get<VisitorRequest[]>(this.baseurl + '/viewUserRequests/' + empId);
  }

  getAllODC(): Observable<ODCList[]> {

    return this.httpClient.get<ODCList[]>('http://localhost:8080/visitor/user/odcList');
}

  getOdcManagers(odcName: string): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseurl + '/viewOdcManagers/' + odcName);
  }

  getPendingVisitorRequest(empId: string): Observable<VisitorRequest[]> {
    const url = this.baseurl + '/pendingVisitorRequest/' + empId;
    return this.httpClient.get<VisitorRequest[]>(url);
  }

  getOdcManagerRequests(odcName: string): Observable<VisitorRequest[]> {
    const url = this.baseurl + '/getAllOdcManagerRequests/' + odcName;
    return this.httpClient.get<VisitorRequest[]>(url);
  }

  approveOrRejectOdcRequestMultiple(visitorRequest: VisitorRequest[]) {
    const body = JSON.stringify(visitorRequest);
    const options = {
      headers: {
        'content-Type': 'application/json'
      }
    };
    return this.httpClient.post<boolean>(this.baseurl + '/approveOrRejectAccess', body, options);
  }

  getUserList(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseurl + '/list')
      .pipe(catchError(this.handleError));
  }

  deleteUser(empId: string): Observable<any> {
    return this.httpClient.delete(this.baseurl + '/' + empId)
      .pipe(catchError(this.handleError));
  }


  registrationRequest(data) {
    const apiUrl = this.baseurl + '/registration-request';
    return this.postData(data, apiUrl)
      .pipe(catchError(this.handleError));
  }

  getUserRequestList(empId: string) {
    return this.httpClient.get<User[]>(this.baseurl + '/manager/registration-request/' + empId)
      .pipe(catchError(this.handleError));
  }

  managers(): Observable<any> {
    const url = this.baseurl + '/managerList';
    return this.httpClient.get<User[]>(url)
      .pipe(catchError(this.handleError));
  }

  addOdc(data: { odcId: number; odcName: any }): Observable<any> {
    const apiUrl = this.baseurl + '/addOdc';
    return this.postData(data, apiUrl)
      .pipe(catchError(this.handleError));
  }

  deleteODC(odcName: string) {
    return this.httpClient.delete(this.baseurl + '/deleteOdc/' + odcName)
      .pipe(catchError(this.handleError));
  }

  login(empId: string, password: string) {
    const url = this.baseurl + 'login' + '/' + empId + '/' + password;
    const result = this.httpClient.post<User>(url, this.options);
    return result;
  }

  addAsset(asset:AssetList):Observable<AssetList>{
    const body = JSON.stringify(asset);
    console.log('body ');
    console.log(body);
    const options = {
      headers: new HttpHeaders({
        'content-Type': 'application/json'
      })
    };
    return this.httpClient.post<AssetList>('http://localhost:8080/visitor/asset/addAsset', body, options);
  }

}
