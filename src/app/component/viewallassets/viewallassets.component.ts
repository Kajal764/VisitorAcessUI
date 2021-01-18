import { Component, OnInit } from '@angular/core';
import { AssetList } from 'src/app/models/AssetList';
import { AssetServiceService } from 'src/app/service/asset-service.service';

@Component({
  selector: 'app-viewallassets',
  templateUrl: './viewallassets.component.html',
  styleUrls: ['./viewallassets.component.css']
})
export class ViewallassetsComponent implements OnInit {

  assetList:AssetList[];
  isListPresent:boolean =true ;
  role:string;
  constructor(private assetService:AssetServiceService) { }

  ngOnInit() {
    this.assetService.getAssetList(localStorage.getItem('user'))
      .subscribe((data) => {
          this.assetList = data;
          if (this.assetList.length === 0) {
            this.isListPresent = false;
          }
        },
        (error) => console.log(error));
      }


}
