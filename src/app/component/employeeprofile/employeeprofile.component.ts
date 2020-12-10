import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employeeprofile',
  templateUrl: './employeeprofile.component.html',
  styleUrls: ['./employeeprofile.component.css']
})
export class EmployeeprofileComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
