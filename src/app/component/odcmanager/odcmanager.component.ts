import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {User} from '../../models/User';
import {AuthService} from 'src/app/service/auth.service';


@Component({
  selector: 'app-odcmanager',
  templateUrl: './odcmanager.component.html',
  styleUrls: ['./odcmanager.component.css']
})
export class OdcmanagerComponent implements OnInit {

  public firstName;
  public lastName;
  public empId;


  constructor(private router: Router, private auth: AuthService) {
  }

  ngOnInit() {
    this.firstName = localStorage.getItem('fName');
    this.lastName = localStorage.getItem('lName');
    this.empId = localStorage.getItem('user');
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
