import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/service/auth.service';

@Component({
  selector: 'app-employeeprofile',
  templateUrl: './employeeprofile.component.html',
  styleUrls: ['./employeeprofile.component.css']
})
export class EmployeeprofileComponent implements OnInit {

  public firstName;
  public lastName;
  public empId;

  constructor(private router: Router, private auth: AuthService) {
  }

  ngOnInit() {
    this.firstName = localStorage.getItem('fName');
    this.lastName = localStorage.getItem('lName');
    this.empId = localStorage.getItem('user');
  }

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      this.router.navigate(['/login']);
      this.auth.logout();
    }
  }

}
