import {Component, Input, OnInit} from '@angular/core';
import {AssetData} from '../models/AssetData';
import {AssetService} from '../service/asset.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

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
  @Input() public search: string;
  mySubscription: any;
  searchDataFound = false;

  constructor(private assetService: AssetService,
              private route: ActivatedRoute,
              private router: Router) {

    // tslint:disable-next-line:only-arrow-functions
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnInit(): void {
    this.search = this.route.snapshot.params.value;
    this.getSearchList(this.search);
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

}

