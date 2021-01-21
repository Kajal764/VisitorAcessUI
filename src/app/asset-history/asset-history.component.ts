import {Component, Input, OnInit} from '@angular/core';
import {AssetData} from '../models/AssetData';
import {AssetService} from '../service/asset.service';
import {InteractionService} from '../service/interaction.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AssetList} from '../models/AssetList';

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

  constructor(private assetService: AssetService,
              private interactionService: InteractionService,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.search = this.route.snapshot.params.value;
    // this.interactionService.searchData$
    //   .subscribe(data => {
    //     this.search = data;
    //     console.log(this.search);
    //     this.getSearchList(data);
    //   });
    this.getSearchList(this.search);
  }

  private getSearchList(search: string) {
    this.assetService.getSearchList(search)
      .subscribe(data => {
          this.assetList = data;
          console.log(this.assetList);
        },
        error => {
          this.message = error.error.message;
        });
  }

}

