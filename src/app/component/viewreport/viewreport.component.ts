import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WeeklyReport} from 'src/app/models/WeeklyReport';
import {UserService} from 'src/app/service/user.service';

@Component({
  selector: 'app-viewreport',
  templateUrl: './viewreport.component.html',
  styleUrls: ['./viewreport.component.css']
})
export class ViewreportComponent implements OnInit {

  empId: string;
  report: string;
  sprintData: string;

  constructor() {
  }

  ngOnInit() {
    this.empId = localStorage.getItem('user');
    this.report = localStorage.getItem('report');
    this.sprintData = localStorage.getItem('sprintData');
  }

}
