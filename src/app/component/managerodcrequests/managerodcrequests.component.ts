import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {VisitorRequest} from 'src/app/models/VisitorRequest';
import {UserService} from 'src/app/service/user.service';
import {NgxNotificationService} from 'ngx-notification';

@Component({
  selector: 'app-managerodcrequests',
  templateUrl: './managerodcrequests.component.html',
  styleUrls: ['./managerodcrequests.component.css']
})
export class ManagerodcrequestsComponent implements OnInit {

  visitorRequests: VisitorRequest[];
  success: boolean;
  public flag: boolean;
  AcceptedByManager = 'Accepted By Manager';
  RejectedByManager = 'Rejected By Manager';
  PendingApproval = 'Pending_Approval';


  constructor(private userService: UserService, private router: Router,
              private ngxNotificationService: NgxNotificationService) {
  }

  ngOnInit() {
    this.userService.getPendingVisitorRequest(localStorage.getItem('user'))
      .subscribe((data) => {
        this.visitorRequests = data;
        console.log(this.visitorRequests);
        this.visitorRequests.length === 0 ? this.flag = true : this.flag = false;
      }, (error) => {
        console.log(error);
      });
  }

  approve(request: VisitorRequest) {
    request.status = 'Accepted By Manager';
    this.sendNotification('Request Accepted');
    this.userService.approveOrRejectOdcRequest(request).subscribe((data) => {
        this.success = data;
      },
      (error) => console.log(error));
  }

  reject(request: VisitorRequest) {
    request.status = 'Rejected By Manager';
    this.sendNotification('Request Rejected ');
    this.userService.approveOrRejectOdcRequest(request).subscribe((data) => {
        this.success = data;
      },
      (error) => console.log(error));
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  sendNotification(message: string) {
    this.ngxNotificationService.sendMessage(message, 'dark', 'bottom-right');
  }
}
