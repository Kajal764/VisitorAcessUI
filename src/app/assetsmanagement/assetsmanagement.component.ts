import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {AssetData} from '../models/AssetData';
import {AssetInfo} from '../models/AssetInfo';
import {AssetDto} from '../models/AssetDto';
import {AssetList} from '../models/AssetList';
import {ODCList} from '../models/ODCList';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-assetsmanagement',
  templateUrl: './assetsmanagement.component.html',
  styleUrls: ['./assetsmanagement.component.css']
})
export class AssetsmanagementComponent implements OnInit {
  odcs: ODCList[];

// asset:AssetData=new AssetData();
  asset: AssetDto = new AssetDto();
  addmore = false;
  count: number;
  // asset: AssetData;
  assets: AssetData;
  assetInfos: AssetInfo = new AssetInfo();
  // addmore = false;
  // count: number;
  arr = [];

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.userService.getAllODC().subscribe((data) => this.odcs = data);
    this.asset.empId = localStorage.getItem('user');

  }

  addAsset() {
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

    // addAsset() {
// this.asset.status="Pending Approval";
// if(this.asset.reason==="newAsset")
// this.asset.assetCondition="Working";
// else
// this.asset.assetCondition="Damaged";
// this.asset.isCurrentOdc=true;


//       this.userService.addAsset(this.asset)
//       .subscribe((data) => {
//           this.asset = data;

//           this.router.navigate(['viewAssetList'])
//     alert(JSON.stringify(this.asset));
//     this.userService.addAsset(this.asset)
//       .subscribe((data) => {
//           this.asset = data;
//           alert('success');
//           this.router.navigate(['viewAssetList']);
//           // this.success = !this.success;

//         }, (error) => {
//           console.log(error);
//         }
//       );
//   }
  }


  addMore() {
    this.addmore = true;
    alert(this.count);
    $('#request').formRepeater();

  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}

