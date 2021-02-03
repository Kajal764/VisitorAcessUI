import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import * as $ from 'jquery';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-commonpage',
  templateUrl: './commonpage.component.html',
  styleUrls: ['./commonpage.component.css']
})
export class CommonpageComponent implements OnInit {
  role:string;
  isEmployee=false;
  isManager=false;
  isOdcManager=false;
  isAdmin=false;

  constructor(private activatedRoute:ActivatedRoute,private router:Router,private auth:AuthService) { }

  ngOnInit() {
  //this.selectRole= this.activatedRoute.snapshot.params.selectRole;
  
  this.role=localStorage.getItem('role');

 if(this.role==="Employee")
this.isEmployee=true;
else if(this.role==="Manager")
this.isManager=true;
else if(this.role==="Odc-Manager")
this.isOdcManager=true;
else
this.isAdmin=true;

$(".main-container,.main").click(function() {
  window.location = $(this).find("a").attr("href"); 
  return false;
});
  

  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
    this.auth.logout();
  }
  


}
