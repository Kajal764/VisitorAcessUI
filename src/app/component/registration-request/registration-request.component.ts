import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../models/User';
import {Router} from '@angular/router';

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

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {

    this.empId = localStorage.getItem('user');
    console.log(JSON.stringify(this.empId));
    console.log( localStorage.getItem('role'));
    console.log(this.empId);
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

  request(user: User, status: boolean): void {
    const data = {
      empId: user.empId,
      status
    };
    const index = this.userList.indexOf(user);
    if (index !== -1) {
      this.userList.splice(index, 1);
      if (this.userList.length === 0) {
        this.isPendingRequest = false;
      }
      this.userService.registrationRequest(data)
        .subscribe(response => {
          this.responseData = response.body;
        }, (error) => {
          this.responseData = error.error;
        });
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
