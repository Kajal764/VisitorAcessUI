import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employeeprofile',
  templateUrl: './employeeprofile.component.html',
  styleUrls: ['./employeeprofile.component.css']
})
export class EmployeeprofileComponent implements OnInit {
  private viewListFlag = false;
  private odcFlag = true;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  showOdcListStatus() {
    this.viewListFlag = true;
    this.odcFlag = false;
  }

  odcRequest() {
    this.viewListFlag = false;
    this.odcFlag = true;
  }
}
