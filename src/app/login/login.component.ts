import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { login } from '../login';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  lg: login = new login();
message:string;
res=false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  logins() {

    this.loginService.login(this.lg.empId, this.lg.password).subscribe(result => {

      if (result) {
        this.lg=result;
        this.res=false;
        
        if((this.lg.role==="Manager")&&(this.lg.accountActive===true))
        {
            
              this.router.navigate(['loginsuccess']);
        }
        else if((this.lg.role==="Employee")&&(this.lg.accountActive===true))
        {
        
        this.router.navigate(['raiseOdcRequest']);
        }
        else{
          
          this.message="Login Failed!!!Account is not activated...."
          this.res=true;
          this.lg.empId = null;
          this.lg.password = "";
        }
      }
    }
      , error => {
        
        this.message="Login Failed!!!Try again...."
        this.res=true;
        this.lg.empId = null;
        this.lg.password = "";

      }


    )

  }

}
