import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AssetList} from 'src/app/models/AssetList';
import {AssetService} from 'src/app/service/asset.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-viewassetlist',
  templateUrl: './viewassetlist.component.html',
  styleUrls: ['./viewassetlist.component.css']
})
export class ViewassetlistComponent implements OnInit {


  constructor(private assetService: AssetService, private router: Router) {
  }

  assetList: AssetList[];
  isListPresent = true;
  searchText = '';
  assetStatus: any;

  ngOnInit() {
    this.assetService.getAssetListForOdcManager(localStorage.getItem('user'), 'All')
      .subscribe((data) => {
          this.assetList = data;
          if (this.assetList.length === 0) {
            this.isListPresent = false;
          }
        },
        (error) => console.log(error));
  }

  viewHistory(serialNumber: string) {
    this.router.navigate(['/asset-history', serialNumber]);
  }

}
