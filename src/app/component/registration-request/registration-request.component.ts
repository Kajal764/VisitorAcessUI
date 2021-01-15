import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../models/User';
import {Router} from '@angular/router';
import {NgxNotificationService} from 'ngx-notification';

@Component({
  selector: 'app-registration-request',
  templateUrl: './registration-request.component.html',
  styleUrls: ['./registration-request.component.css']
})

export class RegistrationRequestComponent implements OnInit {
  public message: any;
  private responseData: any;
  public userList: User[];
  public isPendingRequest: boolean;
  public empId: string;
  private isAdmin: boolean;
  Accept = false;
  requests: any = [];

  constructor(private userService: UserService,
              private router: Router,
              private ngxNotificationService: NgxNotificationService) {
  }

  ngOnInit() {
    if (localStorage.getItem('role') === 'Admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
    this.empId = localStorage.getItem('user');
    this.getUserList(this.empId);
  }

  private getUserList(empId: string): void {
    this.userService.getUserRequestList(empId)
      .subscribe(data => {
          this.userList = data;
          this.isPendingRequest = true;
        },
        error => {
          this.message = error.error.message;
          this.isPendingRequest = false;
        });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  requestAll() {
    this.userService.registrationRequest(this.requests)
      .subscribe(response => {
        this.responseData = response.body;
        this.sendNotification(this.responseData.message);
        if (this.requests.length > 1) {
          this.isPendingRequest = false;
        }
      }, (error) => {
        this.responseData = error.error;
      });
  }

  sendNotification(message: string) {
    this.ngxNotificationService.sendMessage(message, 'dark', 'bottom-right');
  }

  approve() {
    this.requests.forEach(value => {
      value.status = true;
    });
    this.requestAll();
  }

  reject() {
    this.requests.forEach(value => {
      value.status = false;
    });
    this.requestAll();
  }

  acceptAll(event) {
    if (event.target.checked === true) {
      this.Accept = true;
      this.userList.forEach(value => {
        const data = {
          empId: value.empId,
          status: true
        };
        this.requests.push(data);
      });
    } else {
      this.Accept = false;
      this.requests = [];
    }
  }

  selectedForApproval(event, user: User) {
    const data = {
      empId: user.empId,
      status: true
    };
    if (event.target.checked === true) {
      this.requests.push(user);
    } else {
      this.requests = this.requests.filter(m => m.empId !== user.empId);
    }
  }

}
