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

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.empId = localStorage.getItem('user');
    this.userService.getUserRequest(this.empId).subscribe((data) => {
        this.userRequests = data;
      },
      (error) => console.log(error));
  }

}
