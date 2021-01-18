import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-assetmanagementnav',
  templateUrl: './assetmanagementnav.component.html',
  styleUrls: ['./assetmanagementnav.component.css']
})
export class AssetmanagementnavComponent implements OnInit {

  role:string;
  constructor(private router:Router) { }

  ngOnInit() {
    this.role = localStorage.getItem('role');
  }
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

}
