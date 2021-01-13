import {Component, OnInit} from '@angular/core';
import {VisitorRequest} from 'src/app/models/VisitorRequest';
import {UserService} from 'src/app/service/user.service';

@Component({
  selector: 'app-odcmanagerrequests',
  templateUrl: './odcmanagerrequests.component.html',
  styleUrls: ['./odcmanagerrequests.component.css']
})
export class OdcmanagerrequestsComponent implements OnInit {

  odcRequests: VisitorRequest[];
  odcName: string;
  success: boolean;
  requestsPresent:boolean;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getOdcManagerRequests(localStorage.getItem('odc'))
      .subscribe((data) => {
        this.odcRequests = data;
        this.requestsPresent = true;
        console.log(this.requestsPresent);
      }, (error) => {
        console.log(error);
        this.requestsPresent = false;
        console.log(this.requestsPresent);
      });
  }

  approve(request: VisitorRequest) {
    request.status = 'Approved';
    this.userService.approveOrRejectOdcRequest(request).subscribe((data) => {
        this.success = data;
      },
      (error) => console.log(error));
  }

  reject(request: VisitorRequest) {
    request.status = 'Rejected';
    this.userService.approveOrRejectOdcRequest(request).subscribe((data) => {
        this.success = data;
      },
      (error) => console.log(error));
  }
}
