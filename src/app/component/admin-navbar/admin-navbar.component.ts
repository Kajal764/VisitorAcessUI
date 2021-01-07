import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }



}
