import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../models/User';
import {Router} from '@angular/router';
import {RegistrationRequest} from '../../models/RegistrationRequest';


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
  Reject = false;
  // selectedRequests: RegistrationRequest[] = [];
  selectedRequests: any = [];

  constructor(private userService: UserService,
              private router: Router) {
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

  request(user: User): void {
    const index = this.userList.indexOf(user);
    if (index !== -1) {
      this.userList.splice(index, 1);
      if (this.userList.length === 0) {
        this.isPendingRequest = false;
      }
      this.requestAll();
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }


  acceptAll(event, status: boolean) {
    if (event.target.checked === true) {
      this.Accept = true;
      this.userList.forEach(value => {
        const data = {
          empId: value.empId,
          status
        };
        this.selectedRequests.push(data);
      });
    } else {
      this.Accept = false;
      this.selectedRequests = [];
    }
  }

  rejectAll(event, status: boolean) {
    if (event.target.checked === true) {
      this.Reject = true;
      this.userList.forEach(value => {
        const data = {
          empId: value.empId,
          status
        };
        this.selectedRequests.push(data);
      });
    } else {
      this.Reject = false;
      this.selectedRequests = [];
    }
  }

  selectedForApproval(event, empId: string, status: boolean) {
    const data = {
      empId,
      status
    };
    if (event.target.checked === true) {
      this.selectedRequests.push(data);
    } else {
      this.selectedRequests = this.selectedRequests.filter(m => m.empId !== data.empId);
    }
  }

  requestAll() {
    this.userService.registrationRequest(this.selectedRequests)
      .subscribe(response => {
        this.responseData = response.body;
        if (this.selectedRequests.length > 1) {
          this.isPendingRequest = false;
        }
      }, (error) => {
        this.responseData = error.error;
      });
  }
}
