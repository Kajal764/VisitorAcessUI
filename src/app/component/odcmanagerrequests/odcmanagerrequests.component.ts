import {Component, OnInit} from '@angular/core';
import {VisitorRequest} from 'src/app/models/VisitorRequest';
import {UserService} from 'src/app/service/user.service';
import {NgxNotificationService} from 'ngx-notification';

@Component({
  selector: 'app-odcmanagerrequests',
  templateUrl: './odcmanagerrequests.component.html',
  styleUrls: ['./odcmanagerrequests.component.css']
})
export class OdcmanagerrequestsComponent implements OnInit {

  odcRequests: VisitorRequest[];
  odcName: string;
  success: boolean;
  requestsPresent: boolean;
  public message: any;

  constructor(private userService: UserService,
              private ngxNotificationService: NgxNotificationService) {
  }

  ngOnInit() {
    this.userService.getOdcManagerRequests(localStorage.getItem('user'))
      .subscribe((data) => {
        this.odcRequests = data;
        this.requestsPresent = true;
        if (this.odcRequests.length === 0) {
          this.requestsPresent = false;
          this.message = 'No Pending Request !!!';
        }
      }, (error) => {
        this.message = error.error.message;
        this.requestsPresent = false;
      });
  }

  approve(request: VisitorRequest) {
    request.status = 'Approved';
    this.userService.approveOrRejectOdcRequest(request).subscribe((data) => {
        this.success = data;
        this.sendNotification('Request Approved');
      },
      (error) => console.log(error));
  }

  reject(request: VisitorRequest) {
    request.status = 'Rejected';
    this.userService.approveOrRejectOdcRequest(request).subscribe((data) => {
        this.success = data;
        this.sendNotification('Request Rejected');

      },
      (error) => console.log(error));
  }

  sendNotification(message: string) {
    this.ngxNotificationService.sendMessage(message, 'dark', 'bottom-right');
  }
}
