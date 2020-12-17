import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../models/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  public userList: User[];
  public message: any;
  private raisedRequestFlag = false;
  private registrationRequest = false;
  private odcFlag = true;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    const empId = localStorage.getItem('user');
    this.getUserList(empId);
  }

  private getUserList(empId: string): void {
    this.userService.getUserRequestList(empId)
      .subscribe(data => {
          this.userList = data;
          console.log(this.userList);
        },
        error => {
          this.message = error.error.message;
          console.log(error.error);
          console.log(this.message);
        });
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  odcRequest() {
    this.odcFlag = true;
    this.raisedRequestFlag = false;
    this.registrationRequest = false;
  }

  raisedRequest() {
    this.odcFlag = false;
    this.raisedRequestFlag = true;
    this.registrationRequest = false;
  }

  registartion() {
    this.odcFlag = false;
    this.raisedRequestFlag = false;
    this.registrationRequest = true;
  }
}
