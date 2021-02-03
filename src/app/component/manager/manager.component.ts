import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../models/User';
import {Router} from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  public message: any;

  constructor(private userService: UserService,
              private router: Router,private auth:AuthService) {
  }

  ngOnInit() {
  }

  logout() {
    if(confirm('Are you sure you want to logout?')){
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
    this.auth.logout();
    }
  }

}
