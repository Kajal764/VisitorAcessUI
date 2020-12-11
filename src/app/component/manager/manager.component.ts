import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../register/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  public userList: User[];
  public message: any;

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
        },
        error => {
          this.message = error.error.message;
          console.log(error.error);
          console.log(this.message);
        });
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
