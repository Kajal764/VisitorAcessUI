import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AssetList} from 'src/app/models/AssetList';
import {AssetService} from 'src/app/service/asset.service';
import {InteractionService} from '../../service/interaction.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-viewassetlist',
  templateUrl: './viewassetlist.component.html',
  styleUrls: ['./viewassetlist.component.css']
})
export class ViewassetlistComponent implements OnInit {

  assetList: AssetList[];
  isListPresent = true;
  searchText = '';


  constructor(private assetService: AssetService,
              private interactionService: InteractionService,
              private router: Router) {
  }

  ngOnInit() {
    this.assetService.getAssetListForOdcManager(localStorage.getItem('user'))
      .subscribe((data) => {
          this.assetList = data;
          if (this.assetList.length === 0) {
            this.isListPresent = false;
          }
        },
        (error) => console.log(error));

    this.interactionService.searchData$
      .subscribe(data => {
        this.searchText = data;
      });
  }

  viewHistory(serialNumber: string) {
    this.router.navigate(['/asset-history', serialNumber]);
  }
}
