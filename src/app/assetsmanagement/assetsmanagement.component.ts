import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetData } from '../models/AssetData';
import { AssetList } from '../models/AssetList';
import { ODCList } from '../models/ODCList';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-assetsmanagement',
  templateUrl: './assetsmanagement.component.html',
  styleUrls: ['./assetsmanagement.component.css']
})
export class AssetsmanagementComponent implements OnInit {
  odcs: ODCList[];
asset:AssetData=new AssetData();
addmore=false;


  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.userService.getAllODC().subscribe((data) =>this.odcs = data);
this.asset.empId=localStorage.getItem('user');

  
  }

  addAsset(){
this.asset.status="Pending Approval";
    this.userService.addAsset(this.asset)
    .subscribe((data) => {
        this.asset = data;
        alert('success');
        this.router.navigate(['viewAssetList'])
       // this.success = !this.success;
      }, (error) => {
        console.log(error);
      }
    );
}



addMore(){
this.addmore=true;
    
  }
 
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
