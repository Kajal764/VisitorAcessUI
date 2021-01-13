import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {login} from '../../login';
import {LoginService} from '../../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  lg: login = new login();
  message: string;
  res = false;

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit() {
  }

  logins() {
    this.loginService.login(this.lg.empId, this.lg.password).subscribe(result => {
        localStorage.setItem('user', result.empId);
        localStorage.setItem('role', result.role);
        localStorage.setItem('odc', result.odc);
        if (result) {
          this.lg = result;
          this.res = false;
          if ((this.lg.role === 'Manager') && (this.lg.accountActive === true)) {
            this.router.navigate(['odc-request']);
          } else if ((this.lg.role === 'Employee') && (this.lg.accountActive === true)) {
            this.router.navigate(['raiseOdcRequest']);
          } else if ((this.lg.role === 'odcManager') && (this.lg.accountActive === true)) {
            this.router.navigate(['odcManagerRequests']);
          } else if (this.lg.role === 'Admin') {
            if (this.lg.accountActive === true) {
              this.router.navigate(['home-admin']);
            } else {
              this.message = 'Login Failed!!!Account is not activated....';
              this.res = true;
              this.lg.empId = null;
              this.lg.password = '';
            }
          } else {
            this.message = 'Login Failed!!!Account is not activated....';
            this.res = true;
            this.lg.empId = null;
            this.lg.password = '';
          }
        }
      }
      , error => {
        console.log(error.error);
        this.message = error.error;
        this.res = true;
        this.lg.empId = null;
        this.lg.password = '';
      }
    );
  }
}
