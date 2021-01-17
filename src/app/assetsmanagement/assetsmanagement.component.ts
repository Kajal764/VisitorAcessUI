import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
asset:AssetList=new AssetList();
addmore=false;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.userService.getAllODC().subscribe((data) =>this.odcs = data);
  
  }

  addAsset(){

    this.userService.addAsset(this.asset)
    .subscribe((data) => {
        this.asset = data;
        alert('success');
       // this.success = !this.success;
      }, (error) => {
        console.log(error);
      }
    );
}



addMore(){
this.addmore=true;
    
  }
 
}
