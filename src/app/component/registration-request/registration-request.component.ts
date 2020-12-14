import {Component, Input, OnInit} from '@angular/core';
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
  public managerListFlag = false;
  @Input() public EmployeeList = [];
  @Input() public isAdmin: boolean;

  constructor(private userService: UserService,
              private router: Router) {
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

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
