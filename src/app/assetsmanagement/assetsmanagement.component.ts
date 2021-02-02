import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetData } from '../models/AssetData';
import { AssetDto } from '../models/AssetDto';
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
// asset:AssetData=new AssetData();
asset:AssetDto=new AssetDto();
addmore=false;
count:number;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.userService.getAllODC().subscribe((data) =>this.odcs = data);
this.asset.empId=localStorage.getItem('user');

  
  }

  addAsset(){
// this.asset.status="Pending Approval";
    // this.userService.addAsset(this.asset)
    // .subscribe((data) => {
    //     this.asset = data;
    //     alert('success');
    //     this.router.navigate(['viewAssetList'])
    //    // this.success = !this.success;
    //   }, (error) => {
    //     console.log(error);
    //   }
    // );
    // alert(JSON.stringify(this.asset))
    // this.userService.asset=this.asset;
    this.router.navigate(['/addAsset']);
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
