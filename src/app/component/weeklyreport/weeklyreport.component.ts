import { Component, OnInit } from '@angular/core';
import { WeeklyReport } from 'src/app/models/WeeklyReport';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-weeklyreport',
  templateUrl: './weeklyreport.component.html',
  styleUrls: ['./weeklyreport.component.css']
})
export class WeeklyreportComponent implements OnInit {

  currentDate: Date = new Date();
  weeklyReport: WeeklyReport=new WeeklyReport();
  isEmployee: boolean
  success:boolean = false
  constructor(private userService:UserService) { }

  ngOnInit() {
    if (localStorage.getItem('role') === 'Employee') {
      this.isEmployee = true;
    } else {
      this.isEmployee = false;
    }
    this.weeklyReport.empId=localStorage.getItem("user");
  }

  submitReport(){
    alert(JSON.stringify(this.weeklyReport));
    this.userService.saveReport(this.weeklyReport).subscribe(data=>{this.weeklyReport=data;this.success=!this.success});
  }

  

}
