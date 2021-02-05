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

  assetList: AssetList[];
  isListPresent: boolean = true;
  assetTypes = ['All', 'Mouse', 'Keyboard', 'Monitor', 'Laptop', 'Laptop Charger', 'Projector', 'Telephone', 'CPU', 'Cables', 'Tokens', 'Other'];
  selectedText: string = 'All';
  searchText = '';
  assetStatus: any;

  constructor(private assetService: AssetService, private router: Router) {
  }

  ngOnInit() {
    this.assetService.getAssetListForOdcManager(localStorage.getItem('user'))
      .subscribe((data) => {
          this.assetList = data;
        },
        (error) => this.isListPresent = false);
  }

  viewHistory(serialNumber: string) {
    this.router.navigate(['/asset-history', serialNumber]);
  }

}
