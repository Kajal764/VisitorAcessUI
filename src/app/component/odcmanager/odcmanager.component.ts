import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {User} from '../../models/User';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-odcmanager',
  templateUrl: './odcmanager.component.html',
  styleUrls: ['./odcmanager.component.css']
})
export class OdcmanagerComponent implements OnInit {

  constructor(private router: Router,private auth:AuthService) {
  }

  ngOnInit() {
  }

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      this.router.navigate(['/login']);
      this.auth.logout();
    }
  }

}
