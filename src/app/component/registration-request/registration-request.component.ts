import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../register/User';

@Component({
  selector: 'app-registration-request',
  templateUrl: './registration-request.component.html',
  styleUrls: ['./registration-request.component.css']
})

export class RegistrationRequestComponent implements OnInit {
  public managerList: User[];
  public message: any;
  private responseData: any;
  public managerListFlag = false;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getManagerRegistrationRequest();
  }

  private getManagerRegistrationRequest(): void {
    this.userService.getManagerList()
      .subscribe(data => {
          this.managerList = data;
        },
        error => {
          this.message = error.error.message;
          this.managerListFlag = true;
        });
  }


  request(user: User, status: boolean): void {
    const data = {
      empId: user.empId,
      status
    };
    const index = this.managerList.indexOf(user);
    if (index !== -1) {
      this.managerList.splice(index, 1);
      this.userService.registrationRequest(data)
        .subscribe(response => {
          this.responseData = response.body;
        }, (error) => {
          this.responseData = error.error;
        });
    }
  }
}
