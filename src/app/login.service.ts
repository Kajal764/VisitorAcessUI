import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {login} from './login';
import {User} from './models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseurl = 'http://localhost:8080/visitor/user/';

  constructor(private http: HttpClient) {
  }

  options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  login(empId: string, password: string) {
    const url = this.baseurl + 'login' + '/' + empId + '/' + password;
    const result = this.http.post<login>(url, this.options);
    return result;
  }
}
