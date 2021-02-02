import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AssetData} from 'src/app/models/AssetData';
import {AssetList} from 'src/app/models/AssetList';
import {AssetService} from 'src/app/service/asset.service';

@Component({
  selector: 'app-viewallassets',
  templateUrl: './viewallassets.component.html',
  styleUrls: ['./viewallassets.component.css']
})
export class ViewallassetsComponent implements OnInit {

  assetList:AssetData[];
  isListPresent:boolean =true ;
  role:string;
  assetTypes = ['All','Mouse', 'Keyboard', 'Monitor', 'Laptop', 'Laptop Charger', 'Projector', 'Telephone', 'CPU', 'Cables', 'Tokens', 'Other'];
  selectedText:string='All';
  constructor(private assetService: AssetService, private router: Router) {
  }


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

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }


}
