import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managerprofile',
  templateUrl: './managerprofile.component.html',
  styleUrls: ['./managerprofile.component.css']
})
export class ManagerprofileComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(["/login"]);
  }
}
