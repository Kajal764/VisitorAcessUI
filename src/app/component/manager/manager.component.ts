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
    const item = localStorage.getItem('user');
    this.getUserList(item);
  }

  private getUserList(item: string): void {
    this.userService.getUserRequestList(item)
      .subscribe(data => {
          this.userList = data;
        },
        error => {
          this.message = error.error.message;
        });
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
