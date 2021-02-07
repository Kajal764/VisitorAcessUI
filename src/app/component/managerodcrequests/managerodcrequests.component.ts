import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {VisitorRequest} from 'src/app/models/VisitorRequest';
import {UserService} from 'src/app/service/user.service';
import {NgxNotificationService} from 'ngx-notification';
import {AuthService} from 'src/app/service/auth.service';

@Component({
  selector: 'app-managerodcrequests',
  templateUrl: './managerodcrequests.component.html',
  styleUrls: ['./managerodcrequests.component.css']
})
export class ManagerodcrequestsComponent implements OnInit {

  visitorRequests: VisitorRequest[];
  success: boolean;
  public flag: boolean;
  selectedText: string = 'All';
  AcceptedByManager = 'Accepted By Manager';
  RejectedByManager = 'Rejected By Manager';
  PendingApproval = 'Pending Approval';
  Accept = false;
  requests: VisitorRequest[] = [];

  constructor(private userService: UserService, private router: Router,
              private ngxNotificationService: NgxNotificationService, private auth: AuthService) {
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

  approve() {
    this.requests.forEach(value => {
      value.status = 'Accepted By Manager';
    });
    this.sendNotification('Request Accepted');
    this.userService.approveOrRejectOdcRequestMultiple(this.requests).subscribe((data) => {
        this.success = data;
        this.requests = [];
        this.Accept = false;
      },
      (error) => console.log(error));
  }

  reject() {
    this.requests.forEach(value => {
      value.status = 'Rejected By Manager';
    });
    this.sendNotification('Request Rejected ');
    this.userService.approveOrRejectOdcRequestMultiple(this.requests).subscribe((data) => {
        this.success = data;
        this.requests = [];
        this.Accept = false;
      },
      (error) => console.log(error));
  }

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      this.router.navigate(['/login']);
      this.auth.logout();
    }
  }

  sendNotification(message: string) {
    this.ngxNotificationService.sendMessage(message, 'dark', 'bottom-right');
  }

  acceptAll(event) {
    if (event.target.checked === true) {
      this.Accept = true;
      this.requests = this.visitorRequests;
      this.requests = this.requests.filter(m => m.status !== this.AcceptedByManager);
      this.requests = this.requests.filter(m => m.status !== this.RejectedByManager);
    } else {
      this.Accept = false;
      this.requests = [];
    }
  }

  selectedForApproval(event, visitorRequests: VisitorRequest) {
    if (event.target.checked === true) {
      this.requests.push(visitorRequests);
    } else {
      this.requests = this.requests.filter(m => m.visitorRequestId !== visitorRequests.visitorRequestId);
    }
  }
}
