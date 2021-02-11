import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WeeklyReport} from 'src/app/models/WeeklyReport';
import {UserService} from 'src/app/service/user.service';

@Component({
  selector: 'app-viewreportlist',
  templateUrl: './viewreportlist.component.html',
  styleUrls: ['./viewreportlist.component.css']
})
export class ViewreportlistComponent implements OnInit {

  weeklyReport: WeeklyReport[];
  showreport: boolean = true;
  public isListPresent = false;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getReport(localStorage.getItem('user'))
      .subscribe(data => {
        this.weeklyReport = data;
        console.log(this.weeklyReport);
        if (this.weeklyReport.length !== 0) {
          this.isListPresent = true;
        }
        console.log(this.isListPresent);
      });
  }

  viewReport(report: WeeklyReport) {
    localStorage.setItem('report', report.report);
    localStorage.setItem('sprintData', report.sprintData);
    alert(localStorage.getItem('sprintData'));
    this.router.navigate(['/viewReport']);

  }

}
