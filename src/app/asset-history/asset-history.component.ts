import {Component, OnInit} from '@angular/core';
import {AssetData} from '../models/AssetData';
import {AssetService} from '../service/asset.service';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from '../service/auth.service';

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
  searchDataFound = false;
  public role: string;
  public search: any;

  constructor(private assetService: AssetService,
              private route: ActivatedRoute,
              private router: Router,private auth:AuthService) {
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
    this.auth.logout();
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

