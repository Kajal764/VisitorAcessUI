import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../register/User';

@Component({
  selector: 'app-registration-request',
  templateUrl: './registration-request.component.html',
  styleUrls: ['./registration-request.component.css']
})

export class RegistrationRequestComponent implements OnInit {
  // public managerList: User[];
  public message: any;
  private responseData: any;
  public managerListFlag = false;
  @Input() public EmployeeList = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  request(user: User, status: boolean): void {
    const data = {
      empId: user.empId,
      status
    };
    const index = this.EmployeeList.indexOf(user);
    if (index !== -1) {
      this.EmployeeList.splice(index, 1);
      this.userService.registrationRequest(data)
        .subscribe(response => {
          this.responseData = response.body;
        }, (error) => {
          this.responseData = error.error;
        });
    }
  }
}
