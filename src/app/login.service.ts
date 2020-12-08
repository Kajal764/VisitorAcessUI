import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login } from './login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseurl:string="http://localhost:8081/user/";

  constructor(private http:HttpClient) { }
  options={
    headers:new HttpHeaders({
      "Content-Type":"application/json"
    })
  }
  login(empId:number,password:string){


    let url=this.baseurl+"login"+"/"+empId+"/"+password;
    let result=this.http.post<login>(url,this.options);
    return result;
  }
}
