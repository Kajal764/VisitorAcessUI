import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AssetData } from '../models/AssetData';
import { AssetDto } from '../models/AssetDto';
import { AssetInfo } from '../models/AssetInfo';
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
assets:AssetData;
assetInfos:AssetInfo=new AssetInfo();
assetInfob=[];
addmore=false;
count:number;
arr=[];


  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.userService.getAllODC().subscribe((data) =>this.odcs = data);
this.asset.empId=localStorage.getItem('user');

  
  }

//   addAsset(){
// this.asset.status="Pending Approval";

//     this.userService.addAsset(this.asset)
//     .subscribe((data) => {
//         this.asset = data;
//         alert('success');
//         this.router.navigate(['viewAssetList'])
//        // this.success = !this.success;
//       }, (error) => {
//         console.log(error);
//       }
//     );
// }

addAsset()
{
  //  this.assets={
  // 'assetInfos':[{'name':this.assetInfos.name,'serialNumber':this.assetInfos.serialNumber}],
  // 'empId':this.asset.empId,
  // 'odcName':this.asset.odcName,
  // 'reason':this.asset.reason,
  // 'type':this.asset.type,
  // 'assetCondition':"",
  // 'fromDate':"",
  // 'isCurrentOdc':false,
  // 'requestId':0,
  // 'status':"Pending Approval",
  // 'tillDate':""

 //this.asset.assetInfos.push(this.assetInfob);
  


//  this.assets={
//    'assetInfos':[
//      {
//        'name':this.assetInfos.name,
//    'serialNumber':this.assetInfos.serialNumber}
//   ],
//    'empId':this.asset.empId,
//    'odcName':this.asset.odcName,
//    'reason':this.asset.reason,
//    'type':this.asset.type,
//    'assetCondition':"",
//    'fromDate':"",
//    'isCurrentOdc':false,
//    'requestId':0,
//    'status':"Pending Approval",
//    'tillDate':""
this.assetInfos={serialNumber:"MPS889",name:"jjjj"},{serialNumber:"MPS887",name:"kkkkk"};
this.assetInfob.push(this.assetInfos)
this.asset={
  // 'assetInfos':[{'name':"Cable23",
  //  'serialNumber':"MPS117"},
  //  {'name':"Cable89",
  //  'serialNumber':"MPS118"}
  // ],
 'assetInfos':this.assetInfob,
   'empId':"0000000",
   'odcName':"Pune A",
   'reason':"new asset",
   'type':"laptop",
   'assetCondition':"",
   'fromDate':"",
   'isCurrentOdc':false,
   'requestId':0,
   'status':"Pending Approval",
   'tillDate':""
  
}
 
  alert(JSON.stringify(this.asset));
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
alert(this.count)
$("#request").formRepeater();
    
  }
 
  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
