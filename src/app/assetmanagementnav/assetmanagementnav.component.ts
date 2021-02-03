import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-assetmanagementnav',
  templateUrl: './assetmanagementnav.component.html',
  styleUrls: ['./assetmanagementnav.component.css']
})
export class AssetmanagementnavComponent implements OnInit {


  constructor(private router: Router,private auth:AuthService) {
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
    this.auth.logout();
  }

}
