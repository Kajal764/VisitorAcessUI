import {Component, OnInit} from '@angular/core';
import {ODCList} from 'src/app/models/ODCList';
import {VisitorRequest} from 'src/app/models/VisitorRequest';
import {UserService} from 'src/app/service/user.service';
import {Router} from '@angular/router';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-raiseodcrequest',
  templateUrl: './raiseodcrequest.component.html',
  styleUrls: ['./raiseodcrequest.component.css']
})
export class RaiseodcrequestComponent implements OnInit {

  visitorRequest = new VisitorRequest();
  success = false;
  odcs: ODCList[];
  private loginUser: number;
  public managers: User[];
  private message: any;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.userService.getAllODC().subscribe((data) => this.odcs = data);
    this.userService.managers()
      .subscribe(data => {
          this.managers = data;
        },
        error => {
          this.message = error.error.message;
        });
  }

  raiseRequest() {
    this.loginUser = Number(localStorage.getItem('user'));
    this.visitorRequest.employee = this.loginUser;
    if (this.loginUser == this.visitorRequest.empId) {
      this.visitorRequest.employee = 1;
    }
    this.visitorRequest.status = 'Pending Approval';
    // this.visitorRequest.managerEmpID = 123;
    this.userService.raiseOdcRequest(this.visitorRequest)
      .subscribe((data) => {
          this.visitorRequest = data;
          this.success = !this.success;
        }, (error) => {
          console.log(error);
        }
      );
  }

  viewOdcRequest() {
    this.router.navigate(['viewUserRequest']);
  }
}
