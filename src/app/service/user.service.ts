import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { VisitorRequest } from '../models/VisitorRequest';
import { ODCList } from '../models/ODCList';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public baseUrl: 'http://localhost:8080/user/';

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

  raiseOdcRequest(visitorRequest:VisitorRequest)
  {
    let body=JSON.stringify(visitorRequest);
    let options={
      headers:{
        "content-Type":"application/json"
      }
    }
    return this.httpClient.post<VisitorRequest>(this.baseUrl+"raiseOdcRequest",body,options);
  }

  getUserRequest(empId:number):Observable<VisitorRequest[]>{
    return this.httpClient.get<VisitorRequest[]>(this.baseUrl+"viewUserRequests/"+empId);
  }

  getAllODC():Observable<ODCList[]>{
    return this.httpClient.get<ODCList[]>(this.baseUrl+"odcList");
  }

}
