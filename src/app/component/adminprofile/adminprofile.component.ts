import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {User} from '../register/User';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent implements OnInit {
  private managerList: User[];
  private message: any;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(['/login']);
  }

  redirectToRegistrationRequest() {
    this.userService.getManagerList()
      .subscribe(data => {
          this.managerList = data;
        },
        error => {
          this.message = error.error.message;
        });
  }
}
