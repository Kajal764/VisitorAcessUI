import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../register/User';
import {Router} from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public userList: User[];
  public message: any;
  private responseData: any;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.getUserList();
  }

  private getUserList() {
    this.userService.getUserList()
      .subscribe(data => {
          this.userList = data;
        },
        error => {
          this.message = error.error.message;
        });
  }

  deleteUser(user: User): void {
    const index = this.userList.indexOf(user);
    if (index !== -1) {
      this.userList.splice(index, 1);
      this.userService.deleteUser(user.empId)
        .subscribe(response => {
          this.responseData = response.body;
        }, (error) => {
          this.responseData = error.error;
        });
    }
  }

  redirectToRegister() {
    this.router.navigate(['register']);
  }

  redirectToRegistrationRequest() {
    this.router.navigate(['register-request']);
  }
}
