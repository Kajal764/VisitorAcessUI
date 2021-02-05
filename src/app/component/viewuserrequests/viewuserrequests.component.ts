import {Component, OnInit} from '@angular/core';
import {VisitorRequest} from 'src/app/models/VisitorRequest';
import {UserService} from 'src/app/service/user.service';

@Component({
  selector: 'app-viewuserrequests',
  templateUrl: './viewuserrequests.component.html',
  styleUrls: ['./viewuserrequests.component.css']
})
export class ViewuserrequestsComponent implements OnInit {

  userRequests: VisitorRequest[];
  private empId: string;
  public isEmployee: boolean;
  public listFlag: boolean;
  selectedText:string='All';
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    if (localStorage.getItem('role') === 'Employee') {
      this.isEmployee = true;
    } else {
      this.isEmployee = false;
    }
    this.empId = localStorage.getItem('user');
    this.userService.getUserRequest(this.empId)
      .subscribe((data) => {
          this.userRequests = data;
          this.userRequests.length === 0 ? this.listFlag = false : this.listFlag = true;
        },
        (error) => console.log(error));
  }

}
