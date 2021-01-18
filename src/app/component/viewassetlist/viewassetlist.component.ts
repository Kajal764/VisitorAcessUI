import { Component, OnInit } from '@angular/core';
import { AssetList } from 'src/app/models/AssetList';
import { AssetServiceService } from 'src/app/service/asset-service.service';

@Component({
  selector: 'app-viewassetlist',
  templateUrl: './viewassetlist.component.html',
  styleUrls: ['./viewassetlist.component.css']
})
export class ViewassetlistComponent implements OnInit {

  assetList:AssetList[];
  isListPresent:boolean=true;
  constructor(private assetService:AssetServiceService) { }

  ngOnInit() {
    this.assetService.getAssetListForOdcManager(localStorage.getItem('user'))
      .subscribe((data) => {
          this.assetList = data;
          if (this.assetList.length === 0) {
            this.isListPresent = false;
          }
        },
        (error) => console.log(error));
  }

}
