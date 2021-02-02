import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-assetmanagementnav',
  templateUrl: './assetmanagementnav.component.html',
  styleUrls: ['./assetmanagementnav.component.css']
})
export class AssetmanagementnavComponent implements OnInit {


  constructor(private router: Router) {
  }

  search: string;
  role: string;

  ngOnInit() {
    this.role = localStorage.getItem('role');
  }

  logout() {
    if(confirm('Are you sure you want to logout?')){
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);}
  }

}
