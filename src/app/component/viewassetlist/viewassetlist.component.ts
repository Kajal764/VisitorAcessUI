import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AssetList } from 'src/app/models/AssetList';
import { AssetService } from 'src/app/service/asset.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { ODCList } from 'src/app/models/ODCList';
import { filter } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-viewassetlist',
  templateUrl: './viewassetlist.component.html',
  styleUrls: ['./viewassetlist.component.css']
})
export class ViewassetlistComponent implements OnInit {

  assetList: AssetList[];
  assetListFiltered: AssetList[];
  isListPresent: boolean = true;
  showMessage: boolean = false;
  flag: boolean = false;
  assetTypes = ['All', 'Mouse', 'Keyboard', 'Monitor', 'Laptop', 'Laptop Charger', 'Projector', 'Telephone', 'CPU', 'Cables', 'Tokens', 'Extension Cable', 'Other'];
  selectedText: string = 'All';
  selectedText2: string;
  searchText = '';
  assetStatus: any;
  odcList: ODCList[];

  constructor(private assetService: AssetService, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.assetService.getAssetListForOdcManager(localStorage.getItem('user'))
      .subscribe((data) => {
        this.assetList = data;
        this.assetListFiltered = data;
        this.assetListFiltered = this.assetListFiltered.filter(f=>f.status===this.selectedText)
      },
        (error) => this.isListPresent = false);
    this.userService.getAllODC().subscribe((data) =>
      this.odcList = data);
  }

  viewHistory(serialNumber: string) {
    this.router.navigate(['/asset-history', serialNumber]);
  }

  onOdcNameChange(e) {
    let value = e.target.value;
    // alert(value);
    if (value === "All")
      this.assetListFiltered = this.assetList;
    else
      this.assetListFiltered = this.assetList.filter(f => f.odcName === value);
    // alert(this.assetListFiltered);
    if (this.assetListFiltered === null) {
      this.showMessage = !this.showMessage;
    }
  }

  onAssetTypeChange(event) {
    let value = event.target.value;
    if (value === "All"){
      this.showMessage = false;
      this.assetListFiltered = this.assetList;
      return;
    }
    if (this.assetTypes.includes(value)) {
      // alert(value);
      this.showMessage = false;
      this.assetListFiltered = this.assetList.filter(f => f.type === value);
      // alert(JSON.stringify(this.assetListFiltered))
    }
    else {
      this.showMessage = false;
      this.assetListFiltered = this.assetList.filter(f => f.odcName === value);
    }
    // alert(this.assetListFiltered.length);

    if (this.assetListFiltered.length === 0) {
      // alert('inside show message')
      this.showMessage = true;
      // alert(this.showMessage);
      // this.assetListFiltered =null;
    }
  }

}
