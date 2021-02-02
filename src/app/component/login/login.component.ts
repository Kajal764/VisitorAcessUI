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
  public listOfRole = ['Admin', 'Odc-Manager', 'Manager', 'Employee'];
  private selectRole: any;

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit() {
  }

  logins() {
    this.loginService.login(this.lg.empId, this.lg.password).subscribe(result => {
      console.log(result);
      this.selectRole = this.lg.role;
      localStorage.setItem('user', result.empId);
      localStorage.setItem('role', this.selectRole);
      localStorage.setItem('managerName', result.managerName);
      localStorage.setItem('odcName',result.odc);
      if (result) {
        this.lg = result;
        this.res = false;
        if (this.lg.accountActive === true) {
          this.lg.role.forEach(value => {
            if (value === this.selectRole) {
              if (value === 'Manager') {
                this.router.navigate(['commonpage']);
              } else if (value === 'Employee') {
               // this.router.navigate(['raiseOdcRequest']);
              
               this.router.navigate(['commonpage'],this.selectRole);
              } else if (value === 'Odc-Manager') {
                this.router.navigate(['commonpage']);
              } else if (value === 'Admin') {
                this.router.navigate(['commonpage']);
              } else {
                this.message = 'Login Failed!!!Account is not activated....';
                this.res = true;
                this.lg.empId = null;
                this.lg.password = '';
                this.lg.role = [];
              }
            } else {
              this.message = 'User dont have permission to login as ' + this.selectRole;
              this.res = true;
              this.lg.empId = null;
              this.lg.password = '';
              this.lg.role = [];
            }
          });
        }
      }
    }, error => {
      this.message = error.error;
      this.res = true;
      this.lg.empId = null;
      this.lg.password = '';
      this.lg.role = [];
    });
  }

  changeWebsite($event) {
    this.lg.role = $event.target.value;
  }


}
