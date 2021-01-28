import {Component, Input, OnInit} from '@angular/core';
import {AssetData} from '../models/AssetData';
import {AssetService} from '../service/asset.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {InteractionService} from '../service/interaction.service';

@Component({
  selector: 'app-asset-history',
  templateUrl: './asset-history.component.html',
  styleUrls: ['./asset-history.component.css']
})
export class AssetHistoryComponent implements OnInit {

  public assetList: AssetData[];
  public message: any;
  public isTypeLaptop = 'laptop';
  public isTypeKeyboard = 'keyboard';
  public isTypeCpu = 'cpu';
  public isTypeMonitor = 'monitor';
  public isTypeMouse = 'mouse';
  public isTypeOther = 'other';
  mySubscription: any;
  searchDataFound = false;
  public role: string;
  public search: any;
  searchText: any;

  constructor(private assetService: AssetService,
              private route: ActivatedRoute,
              private router: Router,
              private interactionService: InteractionService) {
  }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.search = this.route.snapshot.params.value;
    this.getSearchList(this.search);
  }


  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }

  private getSearchList(search: string) {
    this.assetService.getSearchList(search)
      .subscribe(data => {
          this.assetList = data;
          if (this.assetList.length === 0) {
            this.searchDataFound = true;
          }
        },
        error => {
          this.message = error.error.message;
        });
  }

  searchData(event: any) {
    this.interactionService.sendData(event);
  }
}

