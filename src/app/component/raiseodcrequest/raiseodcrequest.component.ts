import {Component, OnInit} from '@angular/core';
import {ODCList} from 'src/app/models/ODCList';
import {VisitorRequest} from 'src/app/models/VisitorRequest';
import {UserService} from 'src/app/service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-raiseodcrequest',
  templateUrl: './raiseodcrequest.component.html',
  styleUrls: ['./raiseodcrequest.component.css']
})
export class RaiseodcrequestComponent implements OnInit {

  visitorRequest = new VisitorRequest();
  success = false;
  odcs: ODCList[];
  private loginUser: any;
  public isEmployee: boolean;
  currentDate: Date = new Date();
  manager:string;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('role') === 'Employee') {
      this.isEmployee = true;
    } else {
      this.isEmployee = false;
    }
    this.userService.getAllODC().subscribe((data) => this.odcs = data);
    this.loginUser = localStorage.getItem('user');
    this.visitorRequest.empId = this.loginUser;

  }

  raiseRequest() {
    this.manager = localStorage.getItem('managerName');
    console.log(this.manager);
    if(this.manager === 'Admin')
      this.visitorRequest.status = 'Accepted By Manager';
    else
      this.visitorRequest.status = 'Pending Approval';
    this.visitorRequest.managerEmpID = '123';
    this.userService.raiseOdcRequest(this.visitorRequest)
      .subscribe((data) => {
          this.visitorRequest = data;
          this.success = !this.success;
        }, (error) => {
          console.log(error);
        }
      );
  }
}
